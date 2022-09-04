class Course {
    constructor(id, code, name, creditHours, preReq, preReqReverse, preReqHours, 
                    group, semester, outDegree, isTaken, 
                    description, professor, links, gpaPoints) {
        this._id = id;
        this.code = code;
        this.name = name;
        this.creditHours = creditHours;
        this.preReq = preReq || [];
        this.preReqReverse = preReqReverse || [];
        this.preReqHours = preReqHours || 0;
        this.group = group || "";
        this.semester = semester || [];
        this.outDegree = outDegree;
        this.isTaken = isTaken || false;
        this.description = description || "";
        this.professor = professor || [];
        this.links = links || [];
        this.gpaPoints = gpaPoints || 0;
        if (this.outDegree == undefined){
            this.outDegree = this.preReq.length;
        }
    }
    
    static createCourseFromCourseSchema(courseSchema) {
        return new Course(courseSchema._id, courseSchema.code, courseSchema.name, courseSchema.creditHours, 
                            courseSchema.preReq, courseSchema.preReqReverse, courseSchema.preReqHours, 
                            courseSchema.group, courseSchema.semester, courseSchema.outDegree, courseSchema.isTaken, 
                            courseSchema.description, courseSchema.professor, courseSchema.links);
    }

    addGrade(grade) {
        switch (grade) {
            case "A+":
            case "A" : this.gpaPoints = 4; break;
            case "A-": this.gpaPoints = 3.7; break;
            case "B+": this.gpaPoints = 3.3; break;
            case "B" : this.gpaPoints = 3; break;
            case "B-": this.gpaPoints = 2.7; break;
            case "C+": this.gpaPoints = 2.3; break;
            case "C" : this.gpaPoints = 2; break;
            case "C-": this.gpaPoints = 1.7; break;
            case "D+": this.gpaPoints = 1.3; break;
            case "D" : this.gpaPoints = 1; break;
            case "F" : this.gpaPoints = 0; break;
            default: this.gpaPoints = 0; break;
        }
    }

    takeCourse() {
        if (this.outDegree == 0) {
            this.isTaken = true;
        } else {
            throw new Error("Course " + this.code + " cannot be taken because it has prerequisites.");
        }
    }

    dropCourse() {
        if (this.isTaken) {
            this.isTaken = false;
            this.preReqReverse.forEach(course => {
                course.dropCourse();
                course.outDegree++;
            });
        } else {
            console.log("Course " + this.code + " cannot be dropped because it is not taken.");
        }
    }
}

class Semester {
    constructor(id, type, courses, credits, maxCredits, gpa, pastSemestersCredits, cumulativeGPA) {
        this.id = id;
        this.type = type || "";
        this.courses = courses || [];
        this.credits = credits || 0;
        this.maxCredits = maxCredits || 21;
        this.gpa = gpa || 0;
        this.pastSemestersCredits = pastSemestersCredits || 0;
        this.cumulativeGPA = cumulativeGPA || 0;
    }

    static createSemesterFromSemesterSchema(semesterSchema) {
        return new Semester(semesterSchema.id, semesterSchema.type, semesterSchema.courses,
                                semesterSchema.credits, semesterSchema.maxCredits, semesterSchema.gpa,
                                semesterSchema.pastSemestersCredits, semesterSchema.cumulativeGPA);
    }

    calculateGPA() {
        let sum = 0;
        let credits = 0;
        for (let course of this.courses) {
            if (course.grade) {
                sum += course.creditHours * course.grade;
                credits += course.creditHours;
            }
        }
        return this.gpa = sum / credits;
    }
    
    addCourse(course) {
        console.log("Semester " + this.id + " is adding course: " + course.code + " with the following data: " + JSON.stringify(course));

        if (this.credits + course.creditHours <= this.maxCredits) {
            if (!this.courses.includes(course) && !course.isTaken) {
                if (course.semester.includes(this.type)) {
                    course.takeCourse()
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
        if (this.courses.includes(course)) {
            this.courses.splice(this.courses.indexOf(course), 1);
            this.credits -= course.creditHours;
            course.preReq.forEach((preReq) => {
                if (this.courses.includes(preReq)) {
                    this.removeCourse(preReq);
                }
            });
            course.dropCourse();
        } else {
            throw new Error("Course is not in this semester.");
        }
    }

    setCumulativeGPA(cumulativeGPA) {
        this.cumulativeGPA = cumulativeGPA;
        switch (cumulativeGPA) {
            case cumulativeGPA >= 3.00: this.maxCredits = 21; break;
            case cumulativeGPA >= 2.5: this.maxCredits = 20; break;
            case cumulativeGPA >= 2.0: this.maxCredits = 19; break;
            case cumulativeGPA >= 1.7: this.maxCredits = 17; break;
            case cumulativeGPA < 1.7: this.maxCredits = 17; break;
        }
    }
}

class CourseMap {
    constructor(id, name, username, program, courses, semesters, credits, gpa) {
        this.id = id;
        this.name = name || "Course Map";
        this.username = username || "";
        this.program = program || "PRE";
        this.semesters = semesters || [];
        this.courses = courses || [];
        this.credits = credits || 0;
        this.gpa = gpa || 0;
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
        courseMap.gpa = courseMapSchema.gpa;
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
        this.updatePastSemestersData();
        return semester;
    }

    addCourseToSemester(course, semester) {
        console.log("Adding course: " + course.code + " to semester: " + semester.id + " with the following data: " + JSON.stringify(course)); 

        if (this.courses.includes(course)) {
            semester.addCourse(course);
            course.preReqReverse.forEach((preReqId) => {
                let preReq = this.courses.find(course => course._id === preReqId);
                if (preReq) {
                    preReq.outDegree--;
                }
            });
            this.credits += course.creditHours;
            this.updatePastSemestersData();
        } else {
            throw new Error("Course does not exist.");
        }
    }

    removeCourseFromSemester(course, semester) {
        if (this.courses.includes(course)) {
            semester.removeCourse(course);
            this.credits -= course.creditHours;
            this.updatePastSemestersData();
        } else {
            throw new Error("Course does not exist.");
        }
    }

    calculateGPA() {
        let sum = 0;
        let credits = 0;
        for (let semester of this.semesters) {
            sum += semester.gpa * semester.credits;
            credits += semester.credits;
        }
        return this.gpa = sum / credits;
    }

    updatePastSemestersData() {
        let credits = 0;
        let sum = 0;
        let gpa = 0;
        for (let semester of this.semesters) {
            semester.pastSemestersCredits = credits;
            semester.setCumulativeGPA(gpa);
            credits += semester.credits;
            sum += semester.gpa * semester.credits;
            gpa = sum / credits;
        }
    }
}

module.exports = {
    Course,
    Semester,
    CourseMap
}