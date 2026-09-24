# 思思行程安排

直接用浏览器打开 `index.html` 即可使用，无需安装依赖、后端或网络。

也可运行 `python3 -m http.server 5173 --bind 127.0.0.1`，访问 http://127.0.0.1:5173。

- 点击时间输入 HH:MM；清空该时间后恢复自动推算。
- 耗时支持 20min、45min、1h、1h20min、2h05min。
- 支持 1–20 个节点，横向滚动；可编辑地点和出发/到达类型。
- 多个已知时间不一致时提示冲突；跨日提示超出单日。
- 删除中间节点会合并其前后耗时；重置恢复仅含九龙塘的初始状态。
- 数据仅保存在当前页面内存，刷新后恢复仅含九龙塘的初始状态。

将 index.html、style.css、timeline.js、app.js 放到任何静态托管服务即可部署。

## GitHub Pages 发布

仓库：`git@github.com:Jackyxia-hkbu/one_day_timeline.git`。

在仓库 Settings → Pages → Build and deployment 中，将 Source 设为 GitHub Actions。
推送到 main 后，仓库自带的 Pages 工作流会发布网页文件。
部署成功后的默认网址为：https://jackyxia-hkbu.github.io/one_day_timeline/ 。

手机可通过同一网址访问，时间线支持左右滑动。网页公开可访问，无账号登录；行程输入不会上传到服务器，也不会在设备之间同步。

可在起点前、任意两个节点之间和终点后点击添加。中间插入默认平分原耗时，总耗时保持不变，可分别修改两段耗时。

初始状态仅有「九龙塘」一个出发节点，已知时间 09:00，无时间段。

点击「导出图片」生成纯行程 PNG 预览，可截图或手机长按图片保存，不自动下载。
