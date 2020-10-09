# Color 色彩

`Monkey-View`使用一套特定的调色版来规定颜色，来达到一致的外观视觉感受和保证页面效果的一致性。


## 主色

monkey-view 提供友好的蓝色作为主色。

<Row :gutter="20">
    <Col>
        <div class="doc-color doc-color-primary">
            Primary
            <div class="doc-color-value">#2d8cf0</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-primary-light">
            Light Primary
            <div class="doc-color-value">#57a3f3</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-primary-dark">
            Dark Primary
            <div class="doc-color-value">#297ed8</div>
        </div>
    </Col>
</Row>


## 辅助色

辅助色是在不同场景下使用的具有代表性的颜色。

<Row :gutter="20">
    <Col>
        <div class="doc-color doc-color-info">
            Info
            <div class="doc-color-value">#13c2c2</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-success">
            Success
            <div class="doc-color-value">#19be6b</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-warning">
            Warning
            <div class="doc-color-value">#f8ac59</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-danger">
            Danger
            <div class="doc-color-value">#ed4014</div>
        </div>
    </Col>
</Row>

## 中性色

中性色常用于文本、背景、边框等，可以体现出页面的层次结构。

<Row class="doc-color-row" :gutter="20">
    <Col>
        <div class="doc-color doc-color-title">
            标题文字
            <div class="doc-color-value">#17233d</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-default">
            主要文字
            <div class="doc-color-value">#515a6e</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-des">
            次要文字
            <div class="doc-color-value">#808695</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-dark doc-color-placeholder">
            占位文字
            <div class="doc-color-value">#c0c4cc</div>
        </div>
    </Col>
</Row>
<Row class="doc-color-row" :gutter="20">
    <Col>
        <div class="doc-color doc-color-dark doc-color-disabled">
            禁用文字
            <div class="doc-color-value">#dcdee2</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-dark doc-color-border">
            边框
            <div class="doc-color-value">#e9e9eb</div>
        </div>
    </Col>
    <Col>
        <div class="doc-color doc-color-dark doc-color-background">
            背景
            <div class="doc-color-value">#f4f4f5</div>
        </div>
    </Col>
</Row>
