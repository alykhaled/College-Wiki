class Course {
    constructor(id, code, name, creditHours, preReq, preReqReverse, preReqHours, 
                    group, availableSemesters, outDegree, isTaken, semestersTakenIDs,
                    description, professor, links) {
        this._id = id;
        this.code = code;
        this.name = name;
        this.creditHours = creditHours;
        this.description = description || "";
        this.professor = professor || [];
        this.links = links || [];

        this.preReq = preReq || [];
        this.preReqReverse = preReqReverse || [];
        this.preReqHours = preReqHours || 0;
        this.group = group || "";
        this.availableSemesters = availableSemesters || [];
        this.outDegree = outDegree;
        this.isTaken = isTaken || false;
        this.semestersTakenIDs = semestersTakenIDs || [];
        
        if (this.outDegree == undefined){
            this.outDegree = this.preReq.length;
        }
    }
    
    static createCourseFromCourseSchema(courseSchema) {
        return new Course(courseSchema._id, courseSchema.code, courseSchema.name, courseSchema.creditHours, 
                            courseSchema.preReq, courseSchema.preReqReverse, courseSchema.preReqHours, 
                            courseSchema.group, courseSchema.availableSemesters, courseSchema.outDegree, courseSchema.isTaken, 
                            courseSchema.semestersTakenIDs, courseSchema.description, courseSchema.professor, courseSchema.links);
    }

    takeCourse(semesterId) {
        if (this.outDegree == 0) {
            this.isTaken = true;
            this.semestersTakenIDs.push(semesterId);
        } else {
            throw new Error("Course " + this.code + " cannot be taken because it has prerequisites.");
        }
    }

    dropCourse() {
        if (this.isTaken) {
            this.isTaken = false;
        } else {
            throw new Error("Course " + this.code + " cannot be dropped because it is not taken.");
        }
    }
}

class Semester {
    constructor(id, type, courses, credits, maxCredits) {
        this.id = id;
        this.type = type || "";
        this.courses = courses || [];
        this.credits = credits || 0;
        this.maxCredits = maxCredits || 21;
    }

    static createSemesterFromSemesterSchema(semesterSchema) {
        return new Semester(semesterSchema.id, semesterSchema.type, semesterSchema.courses,
                                semesterSchema.credits, semesterSchema.maxCredits);
    }

    addCourse(course) {
        if (this.credits + course.creditHours <= this.maxCredits) {
            if (!this.courses.find(c => c.code == course.code) && !course.isTaken) {
                if (course.availableSemesters.includes(this.type)) {
                    course.takeCourse(this.id);
                    this.courses.push(course);
                    this.credits += course.creditHours;
                } else {
                    throw new Error("Course is not offered in this semester.");
                }
            } else {
                throw new Error("Course is already in this semester.");
            }
        } else {
            console.log("Course cannot be added because it exceeds the maximum credits for this semester.");
            console.log("Credits: " + this.credits + " + " + course.creditHours + " > " + this.maxCredits);
            throw new Error("Course cannot be added because it exceeds the maximum credits for this semester.");
        }
    }

    removeCourse(course) {
        let courseIndex = this.courses.findIndex(c => c.code == course.code);
        if (courseIndex != -1) {
            course.dropCourse();
            this.courses.splice(courseIndex, 1);
            console.log("Semester #" +  this.id + " is removing course: " + course.code);
            console.log("semester courses after dropping course: ", this.courses);
            this.credits -= course.creditHours;
        } else {
            console.log("Course cannot be removed because it is not in this semester.");
            throw new Error("Course is not in this semester.");
        }
    }

}

class CourseMap {
    constructor(id, name, username, program, courses, semesters, credits) {
        this.id = id;
        this.name = name || "Course Map";
        this.username = username || "";
        this.program = program || "PRE";
        this.semesters = semesters || [];
        this.courses = courses || [];
        this.credits = credits || 0;
    }

    static loadCourseMapFromSessionStorage(courseMapSessionStorage) {
        if (courseMapSessionStorage) {
            return CourseMap.createCourseMapFromCourseMapSchema(courseMapSessionStorage);
        } else {
            return null;
        }
    }

    static createCourseMapFromCourseMapSchema(courseMapSchema) {
        let courseMap = new CourseMap(courseMapSchema.id, courseMapSchema.name, courseMapSchema.username, courseMapSchema.program);
        courseMap.courses = courseMapSchema.courses.map(courseSchema => Course.createCourseFromCourseSchema(courseSchema));
        courseMap.semesters = courseMapSchema.semesters.map(semesterSchema => Semester.createSemesterFromSemesterSchema(semesterSchema));
        courseMap.credits = courseMapSchema.credits;
        return courseMap;
    }

    addCourse(course) {
        if (!this.courses.includes(course.code)) {
            const newCourse = Course.createCourseFromCourseSchema(course);
            this.courses.push(newCourse);
        } else {
            console.log("Course already added.");
        }
        return false;
    }

    createSemester(type) {
        let semester = new Semester(this.semesters.length, type);
        this.semesters.push(semester);
        return semester;
    }

    addCourseToSemester(course, semester) {
        console.log("Adding course: " + course.code + " to semester: " + semester.id); 
        course.preReq.forEach(preReqId => {
            let preReqCourse = this.courses.find(c => c._id == preReqId);
            if (preReqCourse && (!preReqCourse.isTaken || preReqCourse.semestersTakenIDs[0] >= semester.id) ) {
                throw new Error("Course " + course.code + " cannot be added because it has a prerequisite that is not taken.");
            }
        });

        semester.addCourse(course);
        course.preReqReverse.forEach((preReqId) => {
            let preReq = this.courses.find(course => course._id === preReqId);
            if (preReq) {
                preReq.outDegree--;
            }
        });
        this.credits += course.creditHours;

    }

    removeCourseFromSemester(course, semester) {
        console.log("Removing course: " + course.code + " from semester: " + semester.id);
        semester.removeCourse(course);
        this.credits -= course.creditHours;

        course.preReqReverse.forEach((preReqId) => {
            let preReq = this.courses.find(course => course._id === preReqId);
            if (preReq) {
                preReq.outDegree++;
                if (preReq.isTaken) {
                    try {
                        this.removeCourseFromSemester(preReq, this.semesters[preReq.semestersTakenIDs[0]]);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        });
        
       
    }

    getAvailableCourses(semester) {
        let availableCourses = [];
        this.courses.forEach(course => {
            if (!course.isTaken && course.availableSemesters.includes(semester.type)) {
                let preReqTaken = true;
                course.preReq.forEach(preReqId => {
                    let preReqCourse = this.courses.find(c => c._id == preReqId);
                    if (preReqCourse && (!preReqCourse.isTaken || preReqCourse.semestersTakenIDs[0] >= semester.id) ) {
                        preReqTaken = false;
                    }
                });
                if (preReqTaken) {
                    availableCourses.push(course);
                }
            }
        });
        return availableCourses;
    }

}

module.exports = {
    Course,
    Semester,
    CourseMap
}