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

    }
}

module.exports = {
    getLeftPreReq,
    isCourseAvailable,
    removeCourseFromSemester,
};