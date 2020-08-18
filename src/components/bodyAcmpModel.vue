<template>
  <div>
    <ep-form class="demo-form" ref="acmpForm" :form="bodyForm" :rules="page_rules" name-width="168px">
      <ep-row :gutter="10">
        <ep-col :col="12">
          <ep-form-item attr="acmpFormSeqno" label="随附单证序号">
            <ep-input disabled v-model="bodyForm.acmpFormSeqno" name="acmpFormSeqno"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="12">
          <ep-form-item attr="formTypecd" label="文件类型">
            <ep-select v-model="bodyForm.formTypecd" name="formTypecd" :disabled="isDetail">
              <ep-select-item index="R" label="R-减免税证明"></ep-select-item>
              <ep-select-item index="FILE" label="FILE-文件"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="12">
          <ep-form-item attr="formNo" label="随附单证编号">
            <ep-input v-model="bodyForm.formNo" name="formNo" :disabled="isDetail"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="12" v-if="isDetail">
          <ep-form-item attr="fixdNo" label="固定编号">
            <ep-input v-model="bodyForm.fixdNo" name="fixdNo" :disabled="isDetail"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="12" v-if="localType == 'add'">
          <ep-form-item attr="file" label="附件上传">
            <input ref="file" type="file" @change="getFile($event)" />
          </ep-form-item>
        </ep-col>
        <ep-col :col="12" v-else>
          <ep-form-item attr="acmpFormFileNm" label="随附单证文件名称">
            <ep-input disabled v-model="bodyForm.acmpFormFileNm" name="acmpFormFileNm"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="24">
          <ep-form-item attr="rmk" label="备注">
            <ep-input v-model="bodyForm.rmk" name="rmk" type="textarea" :readonly="isDetail"></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
    <div class="btn-group" v-if="!isDetail">
      <ep-button type="primary" size="small" @click="makeSure" :loading="loading" icon="checkmark-round">确定</ep-button>
      <ep-button type="danger" size="small" @click="closeModel" icon="close">关闭</ep-button>
    </div>
  </div>
</template>

<script>
import { cloneObj } from "utils";

export default {
  name: "bodyAcmpModel",
  props: {
    bodyForm: {
      type: Object,
      required: true
    },
    localType: {
      type: String
    },
    isDetail: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      file: '',
      fileName: '',
      page_rules: {
        formTypecd: { required: true, message: "不能为空", trigger: "change" },
      },
    }
  },

  computed: {
    unitList() {
      return this.$store.getters.getUnitList;
    }
  },
 
  methods: {
    // 获取文件
    getFile(event) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    makeSure() {
      this.$refs.acmpForm.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！"
          });
          return;
        }
        if (this.fileName == "") {
          this.$pop({
            type: "danger",
            message: "请选择一个文件！"
          });
          return;
        }
        let checkTest = /[\u4E00-\u9FA5]/g
        if(checkTest.test(this.fileName)){
          this.$pop({
            type: "danger",
            message: "文件名中不能包含中文！"
          });
          return;
        }
        if (this.file.size > 2 * 1024 * 1024) {
          this.$pop({
            type: "danger",
            message: "请选择一个小于2M的文件！"
          });
          return;
        }
        
        this.bodyForm.orgCode = this.$store.getters.getOrgCode;
        if (this.localType == 'add') {
          this.bodyForm.file = this.file;
          this.bodyForm.acmpFormFileNm = this.fileName;
          // 删除修改带的数据
          delete this.bodyForm.id;
          delete this.bodyForm.bigdataId;
          this.loading = true;
          this.$post("fileUpload", this.bodyForm)
            .then(res => {
              this.$emit('onAdd')
              this.loading = false;
            })
            .catch(err => {
              console.log(err)
              this.loading = false;
            })
          
        } else if (this.localType == 'update') {
          this.loading = true;
          this.$post("fileUpdate", this.bodyForm)
            .then(res => {
              this.$emit('onUpdate')
              this.loading = false;
            })
            .catch(err => {
              console.log(err)
              this.loading = false;
            })
        }

      });
      
    },

    closeModel() {
      this.$emit('onCloseModel')
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group {
    text-align: center;
  }
</style>