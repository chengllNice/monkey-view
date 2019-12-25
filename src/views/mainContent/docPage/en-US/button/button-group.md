
```html
<template>
    <ClButtonGroup>
        <ClButton>Left</ClButton>
        <ClButton type="primary">Right</ClButton>
    </ClButtonGroup>
    <br>
    <ClButtonGroup>
        <ClButton disabled>Left</ClButton>
        <ClButton disabled>Center</ClButton>
        <ClButton disabled>Right</ClButton>
    </ClButtonGroup>

    <h4>Icon</h4>
    <ClButtonGroup>
        <ClButton type="primary">
            <i class="cl-icon-left"></i> Left
        </ClButton>
        <ClButton type="primary">Right <i class="cl-icon-right"></i></ClButton>
    </ClButtonGroup>
    <ClButtonGroup>
        <ClButton type="primary" icon="cl-icon-arrow-left"></ClButton>
        <ClButton type="primary" icon="cl-icon-arrow-right"></ClButton>
    </ClButtonGroup>
    <ClButtonGroup>
        <ClButton icon="cl-icon-edit"></ClButton>
        <ClButton icon="cl-icon-square-plus"></ClButton>
        <ClButton icon="cl-icon-check"></ClButton>
        <ClButton icon="cl-icon-close"></ClButton>
    </ClButtonGroup>
    <h4>Circle</h4>
    <ClButtonGroup>
        <ClButton type="primary" circle>
            <i class="cl-icon-left"></i> Left
        </ClButton>
        <ClButton type="primary" circle>
            Right <i class="cl-icon-right"></i>
        </ClButton>
    </ClButtonGroup>
    <br>
    <ClButtonGroup>
        <ClButton type="primary" circle>Left</ClButton>
        <ClButton type="primary" circle>Center</ClButton>
        <ClButton type="primary" circle>Right</ClButton>
    </ClButtonGroup>
</template>

<script>
    export default {
      data(){
        return{}
      }
    }
</script>
```
