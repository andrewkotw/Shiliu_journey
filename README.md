# Shiliu_journey
A Little Journey Through Shiliu. Class project of 2026

## 石榴小旅行

班級作品入口，點擊封面可進入五組學生網站，各組左下角可返回首頁。

首頁每 3.5 秒依序輪播五組；每次輪到某組（包含點選圓點或箭頭）時，都從該組的 images 照片清單隨機抽一張，可能抽到上次同一張。小圓點仍代表小組，名稱與連結不會跟其他組混用。載入成功後才換圖，載入失敗時保留該組上一張可用照片。滑鼠停留或鍵盤焦點位於輪播區時暫停切換；裝置開啟減少動態效果時預設暫停。停用 JavaScript 時，第一組備用照片與下方全部作品卡片仍可使用。

備用照片：涼泉芳 `group-01/images/photo-03.jpg`、塔吉特觀光工廠 `group-02/images/photo-03.jpg`、塔吉特千層蛋糕 `group-03/images/photo-02.jpg`、石榴火車站 `group-04/images/photo-02.jpg`、品御食光炸雞 `group-05/images/photo-05.jpg`。隨機清單收錄各組 images 資料夾中的 JPG、JPEG、PNG、WebP，目前共 26 張。新增照片後須重新產生入口，讓新檔案進入清單；不是由瀏覽器列出伺服器目錄。只引用原有圖片，不改動學生作品或卡片封面。

正式網址：https://andrewkotw.github.io/Shiliu_journey/

這是獨立靜態網站，不需要登入或安裝套件。原始學生 ZIP、可編輯的 `project.json` 及本機備份不放入公開儲存庫。

## 更新與發布

網站檔案為根目錄的 `index.html`、`class-style.css` 與 `groups/`。請保留相對路徑及各組的 `images/` 資料夾。

使用 Node.js 24 執行 `node scripts/check-site.mjs` 檢查檔案及連結。推送至 `main` 後，GitHub Actions 檢查成功才會發布到 GitHub Pages；也可手動執行工作流程。

外部 YouTube 影片與 Google Maps 需有網路。作品的小組名稱、文字與照片為公開網頁的一部分，更新時仍須先確認公開授權及個人資料。
