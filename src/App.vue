<template>
     <div id="app" class="container-fluid header-style">
        <div class="container" style="height:200px;">
        <div class="row pt-5 pl-4">
            <header>
                <div class="col-md-4">
                    <h2> devjobs </h2>
                </div>
            </header>
        </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.header-style {
    position: relative;
    width: 100%;
    height:200px;
    background-image: linear-gradient(#5865E0,#1c2685);
    border-bottom-left-radius: 120px 90px;
}
h2 {
    color: white;
}
</style>
