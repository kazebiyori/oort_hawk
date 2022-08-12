<template>
    <!-- 功能按钮 -->
    <div class="functionbutton">
        <div class="group">
            <div class="planegroup">
                <img src="../SVG/plane.svg" alt="#">
            </div>
            <div class="enginegroup">
                <img src="../SVG/engine.svg" alt="#">
            </div>
        </div>
        <div class="order">
            <div class="ascendingorder">
                <img src="../SVG/ascendingorder.svg" alt="#">

            </div>
            <div class="descendingorder">
                <img src="../SVG/descendingorder.svg" alt="#">
            </div>
        </div>
        <div class="deselectall">
            <img src="../SVG/deselectall.svg" alt="#">
        </div>
        <div class="filter">
            <img src="../SVG/filter.svg" alt="#" @click="changewidth">
        </div>
    </div>
    <!-- 数据列表 -->
    <div class="datalistdispalay">
        <el-tree :data="dataSource" show-checkbox node-key="id" default-expand-all />
    </div>
    <div class="filterpanel">
        <Sidebarfilterpanel :class="{ 'open': isOpened, 'close': !isOpened }"></Sidebarfilterpanel>
    </div>
</template>

<script >
import { Sidebarfilterpanel } from '@/components/index.js'



export default {
    data() {
        return {
            // 虚假数据
            isOpened: true,
            dataSource: [
                {
                    id: 1,
                    label: 'Level one 1',
                    children: [
                        {
                            id: 4,
                            label: 'Level two 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: 'Level three 1-1-1',
                                },
                                {
                                    id: 10,
                                    label: 'Level three 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    label: 'Level one 2',
                    children: [
                        {
                            id: 5,
                            label: 'Level two 2-1',
                        },
                        {
                            id: 6,
                            label: 'Level two 2-2',
                        },
                    ],
                },
                {
                    id: 3,
                    label: 'Level one 3',
                    children: [
                        {
                            id: 7,
                            label: 'Level two 3-1',
                        },
                        {
                            id: 8,
                            label: 'Level two 3-2',
                        },
                    ],
                },
            ]
        }
    },
    components: {
        Sidebarfilterpanel
    },
    methods: {
        changewidth() {
            this.isOpened = !this.isOpened;
        }
    }

}

</script>


<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

.functionbutton {
    height: 2vw;
}

img {
    width: 25px;
    height: 25px;
    margin-top: 0.5vh;

}

.planegroup,
.enginegroup {
    display: inline-block;
    margin: 1px 3px;
}

.ascendingorder,
.descendingorder {
    display: inline-block;
    margin: 1px 2px;
}

.group,
.order,
.deselectall,
.filter {
    display: inline-block;
}

.group {
    margin-left: 5px;
    margin-right: 8px;
}

.order,
.deselectall {
    margin: 1px 8px;
}

.filter {
    margin-left: 8px;
}

.filter,
.deselectall {
    margin-top: 1px;
}

.datalistdispalay {
    height: $navbarHeight - 1vh;
    margin-top: 1vh;
    justify-content: space-between;
    font-size: 14px;
}


.open {
    position: absolute;
    vertical-align: top;
    top: $navbarHeight;
    left: 17vw;
    z-index: 20px;
    width: $sidebarFilterPanelWidth;
    height: $sidebarHeight;
    background-color: rgb(152, 77, 209);

}

.close {
    position: absolute;
    vertical-align: top;
    opacity: 0;
    top: $navbarHeight;
    left: 17vw;
    z-index: 20px;
    width: $sidebarFilterPanelWidth;
    height: $sidebarHeight;
    background-color: rgb(152, 77, 209);
}
</style>
