<template>
    <h2>欢迎，用户{{username}}</h2>
    <p>欢迎光临本档案管理系统，您可以点击上方或者左侧按钮开始您的工作，如果是第一次进入系统，可以参考下面文档:</p>
    <p>
    <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">使用说明&raquo;</a>
    </p>
</template>

<script>
	export default {
		data: function() {
			return {
				username: 'test'
			}
		}
	}
</script>
