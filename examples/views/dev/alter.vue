<template>
    <div class="dev-alter">
        <Alter>alter</Alter>
        <Alter type="success">success</Alter>
        <Alter type="error">error</Alter>
        <Alter type="warning">warning</Alter>

        <p>含描述信息</p>
        <Alter>
            alter
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="success">
            success
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="error">
            error
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning">
            warning
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>带icon</p>
        <Alter type="info" show-icon>An info prompt</Alter>
        <Alter type="success" show-icon>An info prompt</Alter>
        <Alter type="error" show-icon>An info prompt</Alter>
        <Alter type="warning" show-icon>An info prompt</Alter>
        <Alter type="info" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="success" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="error" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning" show-icon>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
        <Alter type="warning" show-icon>
            <Icon slot="icon" type="sound"></Icon>
            custom icon
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>可关闭</p>
        <Alter closable>An info prompt</Alter>
        <Alter closable show-icon>An info prompt</Alter>
        <Alter type="info" show-icon closable>
            An info prompt
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>

        <p>自定义关闭内容</p>
        <Alter closable>
            An info prompt
            <span slot="close">close</span>
        </Alter>

        <p>主题dark</p>
        <Alter theme="dark">An info prompt</Alter>
        <Alter type="success" theme="dark">An info prompt</Alter>
        <Alter type="error" theme="dark">An info prompt</Alter>
        <Alter type="warning" theme="dark">An info prompt</Alter>
        <Alter show-icon closable theme="dark">
            An info prompt
            <span slot="close">close</span>
        </Alter>
        <Alter closable show-icon theme="dark">
            An info prompt
            <span slot="close">close</span>
            <div slot="description">Content of prompt. Content of prompt. Content of prompt. Content of prompt.</div>
        </Alter>
    </div>
</template>
