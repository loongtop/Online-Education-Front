<template>
  <div class="app-container">
    Form of Teacher
     <el-form label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="Order">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="Title">
        <el-select v-model="teacher.level" clearable placeholder="Slection">
          <el-option :value="1" label="Senior Teacher"/>
          <el-option :value="2" label="Chief Teacher"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Experience">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="Profile">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- Lecturer Avatar -->
      <el-form-item label="Lecturer Avatar">

          <!-- Avatar Thumbnail -->
          <pan-thumb :image="teacher.avatar"/>
          <!-- file upload button -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">change avatar
          </el-button>

      <!--
      v-show: whether to display the upload component
       :key: Similar to id, if a page has multiple image upload controls, it can be distinguished
       :url: url address uploaded in the background
       @close: close the upload component
       @crop-upload-success: callback after successful upload
         <input type="file" name="file"/>
      -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher:{
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },

      //Whether the upload popup component is displayed
      imagecropperShow:false,
      imagecropperKey:0,// key value
      BASE_API:process.env.BASE_API, //Get the address in dev.env.js
      saveBtnDisabled:false  // Whether the save button is disabled,
    }
  },
  created() { //Executed before page rendering
    this.init()
  },
  watch: {  // listen
    //The route changes, the route changes, the method will be executed
    $route(to, from) { 
      this.init()
    }

  },
  methods:{
    close() { //close the upload popup
        this.imagecropperShow=false
        //Upload component initialization
        this.imagecropperKey = this.imagecropperKey+1
    },
    //Upload success method
    cropSuccess(data) {
      this.imagecropperShow=false
      //After uploading, the interface returns the image address
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //Determine if the path has an id value and modify it
      if(this.$route.params && this.$route.params.id) {
          
          const id = this.$route.params.id
          
          this.getInfo(id)
      } else { //The path has no id value, do add it 
      
        this.teacher = {}
      }
    },
    
    getInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      // Determine whether to modify or add
       //According to whether the teacher has an id
      if(!this.teacher.id) {
        
        this.saveTeacher()
      } else {
        
        this.updateTeacher()
      }
    },
   
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          
          this.$message({
              type: 'success',
              message: 'success!'
          });
          // go back to the list page routing jump
          this.$router.push({path:'/teacher/table'})
        })
    },

    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => {
          
          this.$message({
              type: 'success',
              message: 'success!'
          });
          
          this.$router.push({path:'/teacher/table'})
        })
    }

  }
}
</script>
