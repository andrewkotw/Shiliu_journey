# Shiliu_journey
A Little Journey Through Shiliu. Class project of 2026

## 石榴小旅行

班級作品入口，點擊封面可進入五組學生網站，各組左下角可返回首頁。

首頁精選區每 3.5 秒輪播各組封面、名稱與作品連結，可使用上一張、下一張及暫停按鈕。滑鼠停留或鍵盤焦點位於輪播區時暫停切換；裝置開啟減少動態效果時預設暫停。即使停用 JavaScript，第一組精選與下方全部作品卡片仍可使用。

正式網址：https://andrewkotw.github.io/Shiliu_journey/

這是獨立靜態網站，不需要登入或安裝套件。原始學生 ZIP、可編輯的 `project.json` 及本機備份不放入公開儲存庫。

## 更新與發布

網站檔案為根目錄的 `index.html`、`class-style.css` 與 `groups/`。請保留相對路徑及各組的 `images/` 資料夾。

使用 Node.js 24 執行 `node scripts/check-site.mjs` 檢查檔案及連結。推送至 `main` 後，GitHub Actions 檢查成功才會發布到 GitHub Pages；也可手動執行工作流程。

外部 YouTube 影片與 Google Maps 需有網路。作品的小組名稱、文字與照片為公開網頁的一部分，更新時仍須先確認公開授權及個人資料。
