<template>
    <div class="dev-breadcrumb">
        <Breadcrumb>
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>二级</BreadcrumbItem>
            <BreadcrumbItem to="/">三级</BreadcrumbItem>
            <BreadcrumbItem><a href="/">四级</a></BreadcrumbItem>
            <BreadcrumbItem>五级</BreadcrumbItem>
        </Breadcrumb>

        <Breadcrumb separator=">">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>二级</BreadcrumbItem>
            <BreadcrumbItem to="/">三级</BreadcrumbItem>
            <BreadcrumbItem><a href="/">四级</a></BreadcrumbItem>
            <BreadcrumbItem>五级</BreadcrumbItem>
        </Breadcrumb>

        <Breadcrumb>
            <BreadcrumbItem><Icon type="home" size="30"></Icon> 首页</BreadcrumbItem>
            <BreadcrumbItem>二级</BreadcrumbItem>
            <BreadcrumbItem to="/"><Icon type="time"></Icon> 三级</BreadcrumbItem>
            <BreadcrumbItem><a href="/">四级</a></BreadcrumbItem>
            <BreadcrumbItem>五级</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
