import request from '@/utils/request'
export default {
    //1 Lecturer list (conditional query pagination)
    //current current page limit number of records per page teacherQuery condition object
    getTeacherListPage(current,limit,teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery condition object, the backend uses RequestBody to get data
            //data means to convert the object to json and pass it to the interface
            data: teacherQuery
          })
    },
    
    deleteTeacherId(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },

    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/add`,
            method: 'post',
            data: teacher
          })
    },
    
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/teacher/get/${id}`,
            method: 'get'
          })
    },
    
    updateTeacherInfo(teacher) {
        return request({
            url: `/eduservice/teacher/update`,
            method: 'post',
            data: teacher
          })
    }
}