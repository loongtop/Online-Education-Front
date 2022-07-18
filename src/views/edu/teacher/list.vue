<template>
  <div class="app-container">
    List of Teacher
    <!--Form-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="Name"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="Title">
          <el-option :value="1" label="Senior Teacher"/>
          <el-option :value="2" label="Chief Teacher"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Create Time">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="Choose a start time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="Choose a deadline"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">Query</el-button>
      <el-button type="default" @click="resetData()">ResetData</el-button>
    </el-form>

    <!-- Table -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="Number"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Title" width="80" />

      <el-table-column label="Title" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'Senior':'Chief Teacher' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="Experiece" />

      <el-table-column prop="gmtCreate" label="Create Time" width="160"/>

      <el-table-column prop="sort" label="Sort" width="60" />

      <el-table-column label="Operation" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- pagination -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>


<script>
import teacher from '@/api/edu/teacher'

export default {
    data() { //Define variables and initial values
        return {
          list:null,//The interface returns the collection after the query
          page:1,//current
          limit:10,
          total:0,
          teacherQuery:{
            "begin": "2018-01-01 00:00:00",
            "end": "2018-01-01 00:00:00"
          } //Condition Encapsulation Object
        }
    },
///////////////////////////////////
    created() { //Executed before page rendering, generally calling the method defined by methods
        this.getList() 
    },
///////////////////////////////////
    methods:{  //Create a specific method and call the method defined by teacher.js
        //Instructor list method
        getList(page=1) {
            this.page = page
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
                .then(response =>{//success
                    //response interface data
                    //console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)   
                    console.log(this.total)
                }) 
        },
        resetData() {//clear data
            
            this.teacherQuery = {}
            
            this.getList()
        },
        removeDataById(id) {
            this.$confirm('This action will permanently delete the instructor record, do you want to continue?', 'Prompt', {
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {  //ok，then method
                
                teacher.deleteTeacherId(id)
                    .then(response =>{//sucess delete
            
                    this.$message({
                        type: 'success',
                        message: 'sucessful delete!'
                    });
                    
                    this.getList()
                })
            }) //Click Cancel to execute the catch method
        }
    }
}

</script>
