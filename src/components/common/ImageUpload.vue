<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="action"
      :auto-upload="true"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-upload="beforeAvatarUpload"
      :limit="limit"
      :list-type="listType"
      :file-list="fileList"
      :multiple="multiple"
      :accept="accept"
    >
      <!-- <i class="el-icon-plus"></i> -->
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->

      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: []
    };
  },
  model: {
    prop: "image",
    event: "changed"
  },
  props: {
    limit: {
      type: Number,
      default: 10
    },
    listType: {
      type: String,
      default: "picture-card"
    },
    action: {
      type: String,
      default: "#"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    image: {
      type: Array,
      default: null
    },
    accept: {
      type: String,
      default: ".jpg,.jpeg,.png,.JPG,.JPEG"
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
      this.fileList.forEach((item, index) => {
        if (item.url === file.url) {
          this.fileList.splice(index, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传失败
    handleAvatarError(err, file) {
      console.log(err, file);
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      const limitCheck = this.fileList.length < this.limit;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      if (!limitCheck) {
        this.$message.error("最多可以上传" + this.limit + "张照片");
      }
      return isJPG && isLt2M && limitCheck;
    }
  },
  mounted() {
    if (this.image) {
      this.image.forEach(item => {
        this.fileList.push({ url: item });
      });
    }
  },
  watch: {}
};
</script>
<style>
/*
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}*/

.el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
}
</style>