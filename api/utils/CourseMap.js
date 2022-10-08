const getLeftPreReq = (course, semester, courseMap) => {
    const leftPreReq = [];

    course.course.preReq.forEach(preReqId => {
        const preReq = courseMap.courses.filter(course => course.course._id == preReqId.toString());
        preReq.forEach(preReq => {
            if (preReq.semestersOrder.length == 0 || preReq.semestersOrder[0] >= semester.order) {
                leftPreReq.push(preReq);
            }
        });
    });
    return leftPreReq;
}

const isCourseAvailable = (course, semester, courseMap) => {
    if (course.semestersOrder.includes(semester.order)) {
        return false;
    }
    const leftPreReq = getLeftPreReq(course, semester, courseMap);

    if (leftPreReq.length > 0 || semester.credits + course.course.creditHours > semester.maxCredits || !course.course.availableSemesters.includes(semester.type)) {
        return false;
    }
    if (course.preReqHours && course.preReqHourse > 0){
        const pastSemestersCredits = 0;
        for(let i = 0; i < semester.order; i++) {
            pastSemestersCredits += courseMap.semesters[i].credits;
        }
        if (course.preReqHours > pastSemestersCredits) {
            return false;
        }
    }
    if (course.course.group && course.course.group.includes("elective")) {
        return checkElectiveCourse(course, semester, courseMap);
    }

    return true;
}

const removeCourseFromSemester = (course, semester, courseMap) => {
    if(course.semestersOrder.length > 0) {
        semester.credits -= course.course.creditHours;
        courseMap.credits -= course.course.creditHours;
        course.semestersOrder.splice(course.semestersOrder.indexOf(semester.order), 1);
        course.course.preReqReverse.forEach(preReqId => {
            const preReq = courseMap.courses.find(course => course.course._id == preReqId.toString());
            if (preReq != null) {
                preReq.outDegree++;
                if (preReq.semestersOrder.length > 0) {
                    removeCourseFromSemester(preReq, courseMap.semesters[preReq.semestersOrder[0]], courseMap);
                }
            }
        });
        semester.courses.splice(semester.courses.indexOf(course), 1);
        if (course.course.group.includes("elective")) {
            removeElectiveCourse(course, semester, courseMap);
        }
    }
}

const checkElectiveCourse = (course, semester, courseMap) => {
    console.log("checking elective course", course.course.name);
    const courseMapElectiveGroup = courseMap.electiveGroups.find(electiveGroup => electiveGroup.group == course.course.group);
    if (courseMapElectiveGroup) {
        if (courseMapElectiveGroup.mustTakeCoursesLeft.find(mustTakeCourse => mustTakeCourse.toString() == course.course._id.toString())) {
            console.log("This is a must take course");
            return true;
        } else {
            const programElectiveGroup = courseMap.program.electiveGroups.find(electiveGroup => electiveGroup.group == course.course.group);
            if (courseMapElectiveGroup.coursesTaken.length + courseMapElectiveGroup.mustTakeCoursesLeft.length + 1 > programElectiveGroup.coursesNumber
                || courseMapElectiveGroup.creditHoursTaken + course.course.creditHours > programElectiveGroup.creditHours) {
                console.log("This is not a must take course and there is no space for it");
                return false;
            }
            console.log("This is not a must take course and there is space for it");
        }
    }
    return true;
}

const addElectiveCourse = (course, semester, courseMap) => {
    const courseMapElectiveGroup = courseMap.electiveGroups.find(electiveGroup => electiveGroup.group == course.course.group);
    courseMapElectiveGroup.creditHoursTaken += course.course.creditHours;
    courseMapElectiveGroup.coursesTaken.push(course.course._id);
    if (courseMapElectiveGroup.mustTakeCoursesLeft.find(mustTakeCourse => mustTakeCourse == course.course._id)) {
        courseMapElectiveGroup.mustTakeCoursesLeft.splice(courseMapElectiveGroup.mustTakeCoursesLeft.indexOf(course.course._id), 1);
    }
}

const removeElectiveCourse = (course, semester, courseMap) => {
    const courseMapElectiveGroup = courseMap.electiveGroups.find(electiveGroup => electiveGroup.group == course.course.group);
    courseMapElectiveGroup.creditHoursTaken -= course.course.creditHours;
    courseMapElectiveGroup.coursesTaken.splice(courseMapElectiveGroup.coursesTaken.indexOf(course.course._id), 1);
    if (courseMapElectiveGroup.mustTakeCoursesLeft.find(mustTakeCourse => mustTakeCourse == course.course._id)) {
        courseMapElectiveGroup.mustTakeCoursesLeft.push(course.course._id);
    }
}




module.exports = {
    getLeftPreReq,
    isCourseAvailable,
    removeCourseFromSemester,
    addElectiveCourse,
};