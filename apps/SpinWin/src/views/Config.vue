<template>
    <el-card class="config">
        <el-tabs v-model="state.activeTab" type="border-card">
            <el-tab-pane name="prizes" label="奖品配置">
                <el-table :data="prizes">
                    <el-table-column label="奖品等级" prop="name">
                        <template #default="{ row }">

                            <el-select v-if="row.isEdit" v-model="row.name" placeholder="请选择">
                                <el-option label="一等奖" value="一等奖" />
                                <el-option label="二等奖" value="二等奖" />
                                <el-option label="三等奖" value="三等奖" />
                                <el-option label="四等奖" value="四等奖" />
                                <el-option label="五等奖" value="五等奖" />
                                <el-option label="六等奖" value="六等奖" />
                            </el-select>
                            <span v-else>{{ row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="奖品名称" prop="description">
                        <template #default="{ row }">
                            {{ row.icon }} {{ row.description }}
                        </template>
                    </el-table-column>
                    <el-table-column label="奖品颜色" prop="color">
                        <template #default="{ row }">
                            <el-color-picker v-if="row.isEdit" v-model="row.color" />
                            <span v-else>{{ row.color }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存/剩余" prop="totalCount" />
                    <el-table-column label="奖品概率" prop="probability" />
                    <el-table-column label="操作" prop="operation">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" v-if="!row.isEdit"
                                @click="row.isEdit = true">编辑</el-button>
                            <el-button type="primary" size="small" v-else @click="row.isEdit = false">保存</el-button>
                            <el-button type="danger" size="small" v-if="row.isEdit"
                                @click="row.isEdit = false">取消</el-button>
                            <el-button type="danger" size="small" v-else>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrizesStore } from '@/stores/prizes'
import { useRouter } from 'vue-router'
const router = useRouter()

const { prizes } = storeToRefs(usePrizesStore())

const state = reactive({
    activeTab: 'prizes'
})



const handleBack = () => {
    router.push({ name: 'Home' })
}
</script>
<style scoped lang="scss">
.config {
    width: 1200px;
    margin: 20px auto;
}
</style>
