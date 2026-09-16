# portfolio-design-skill

用于延续建筑作品册式网页风格的 Codex skill：黑白章节、深绿强调、中文宋体与英文等宽字体、真实影像与大留白。

## 使用

安装到 `$CODEX_HOME/skills/portfolio-design-skill`（未设置时为 `~/.codex/skills/portfolio-design-skill`），保留 `SKILL.md`、`agents/`、`references/` 和 `assets/` 的相对结构。新会话中调用：

```text
$portfolio-design-skill 根据我提供的内容设计一个项目展示网页，沿用当前项目技术栈。
```

也可请求局部改造、摄影页面、工具目录或精简样式手册。Skill 提炼设计语言，不复制原站姓名、履历、项目和整段页面。

## 内容

- [SKILL.md](SKILL.md)：触发范围、设计流程、关键约束和交付检查。
- [设计规则](references/design-language.md)：字体、配色、布局、组件、交互和来源修订说明。
- [CSS 变量种子](assets/tokens.css)：新页面可选起点，不包含重置、组件、字体文件或原站资源依赖。
- `agents/openai.yaml`：Codex 中的技能名称与简介。

根目录原有的两份风格文档和 `style-guide.*` 是用户提供的来源快照，原样保留；其引用的原站 CSS、图片和语言脚本未全部包含，因此不是独立运行的网页模板。最终规则采用对话最后的精简修订：每类组件一个必要样例，并说明结构、比例和状态。
