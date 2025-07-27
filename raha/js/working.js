const mailbox = document.getElementById('mailbox');
const mailSound = document.getElementById('mail-sound');
const bgMusic = document.getElementById('bg-music');
const notifySound = document.getElementById('notify-sound');
const paperSound = document.getElementById('paper-sound');
const notification = document.getElementById('notification');
const itemSlots = document.querySelectorAll('.item-slot');
const modal = document.getElementById('letter-modal');
const modalImg = modal.querySelector('img');
const caption = document.getElementById('letter-caption');
const longTextModal = document.getElementById('long-text-modal');
const longTextContent = document.getElementById('long-text-content');
let seedTaken = false;

let isOpen = false;
let letterDelivered = false;
let isLetterOpened = false;
let letterStage = 0;
let letterOpenedOnce = false;
let holeDisplayed = false;
let seedPlanted = false; // متغیر جدید برای ردیابی کاشتن دونه
let holeFilled = false;  // متغیر جدید برای ردیابی پر شدن چاله

function playBackgroundMusic() {
  bgMusic.volume = 0.4;
  bgMusic.play().catch((err) => {
    console.warn("⛔ پخش موزیک شکست خورد:", err);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
  notification.textContent = "📬 یه نامه جدید داری، برو صندوق پست رو نگاه کن";
  notifySound.currentTime = 0;
  notifySound.play().catch(err => console.warn("⛔ صدای نوتیف اولیه شکست خورد:", err));
});

window.addEventListener('click', () => {
  if (bgMusic.paused) {
    playBackgroundMusic();
  }
}, { once: true });

mailbox.addEventListener('click', () => {
  mailSound.currentTime = 0;
  mailSound.play().catch(err => console.warn("⛔ صدای صندوق شکست خورد:", err));

  if (!isOpen && !letterDelivered) {
    mailbox.src = 'images/mailbox_open.png';
    isOpen = true;
    notification.textContent = "📥 یه نامه؟ از توی اینونتوریت برش دار ببینیم توش چیه";
    notifySound.currentTime = 0;
    notifySound.play().catch(err => {});
  } else if (isOpen && !letterDelivered) {
    deliverLetter();
    mailbox.src = 'images/mailbox_closed.png';
    isOpen = false;
    letterDelivered = true;
  }
});

function deliverLetter() {
  const letter = document.createElement('img');
  letter.src = 'images/letter.png';
  letter.classList.add('letter');

  const box = mailbox.getBoundingClientRect();
  letter.style.top = `${box.top + window.scrollY + 10}px`;
  letter.style.left = `${box.left + window.scrollX + 30}px`;

  document.body.appendChild(letter);

  const targetSlot = Array.from(itemSlots).find(slot => slot.children.length === 0) || itemSlots[0];
  const slotBox = targetSlot.getBoundingClientRect();

  setTimeout(() => {
    const dx = slotBox.left - box.left;
    const dy = slotBox.top - box.top;
    letter.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`;
    letter.style.opacity = '0.8';
  }, 100);

  setTimeout(() => {
    const finalLetter = document.createElement('img');
    finalLetter.src = 'images/letter.png';
    finalLetter.style.width = '100%';
    finalLetter.style.borderRadius = '10px';
    
    if (finalLetter.src.includes("seed.png")) {
        finalLetter.style.pointerEvents = "auto";
        finalLetter.style.cursor = "pointer";
    } else {
        finalLetter.style.pointerEvents = "none";
    }
    
    targetSlot.appendChild(finalLetter);
    document.body.removeChild(letter);
    notification.textContent = "📖 روش کلیک کن تا ببینیم توش چیه";
    notifySound.currentTime = 0;
    notifySound.play().catch(err => {});
  }, 1200);
}

itemSlots.forEach(slot => {
  slot.addEventListener('click', () => {
    if (slot.children.length > 0) {
      const img = slot.querySelector('img');
      const src = img?.getAttribute('src');

      if (!src) return;

      if (src.includes('cat_pic')) {
        modalImg.src = src;
        modal.style.display = 'flex';
        caption.style.display = 'none';
        return;
      }

      if (src.includes('letter') && !letterOpenedOnce) {
        modalImg.src = 'images/letter.png';
        modal.style.display = 'flex';
        caption.style.display = 'none';
        isLetterOpened = true;
        letterStage = 1;
        letterOpenedOnce = true;
        return;
      }

      if (src.includes('letter_sheet')) {
         paperSound.currentTime = 0;
  paperSound.play().catch(err => {});
  longTextModal.style.display = 'flex';
        longTextContent.innerHTML = `
          <p style="font-size: 1.4em; font-weight: bold; border: 2px dashed red; padding: 10px; text-align: center;">101 دلیل که عاشقتم</p>
  <p>1. لبخندت دنیامو روشن می‌کنه</p>
<p>2. چشم‌هات پر از نوره</p>
<p>3. موهات بی‌نظیره همیشه</p>
<p>4. استایلت همیشه جذابه</p>
<p>5. نگاهت پر از مهربونه</p>
<p>6. خنده‌هات زندگی‌بخشه</p>
<p>7. چهره‌ات خاص و دوست‌داشتنیه</p>
<p>8. پوستت لطیف و نرمه</p>
<p>9. دستات حس امن دارن</p>
<p>10. راه رفتنت جذابه</p>
<p>11. ابروهات خیلی مرتبن</p>
<p>12. لب‌هات خیلی قشنگن</p>
<p>13. حالت نشستن با نمکه</p>
<p>14. وقتی خوابی نازتری</p>
<p>15. قدت برام عالیه</p>
<p>16. اعتماد به نفست قشنگه</p>
<p>17. دندونات خیلی نازن</p>
<p>18. نفس‌هات آرامش‌بخشه</p>
<p>19. حالت موهات وقت خستگی</p>
<p>20. ظرافتت دلمو می‌بره</p>
<p>21. مهربون‌ترین آدم دنیایی</p>
<p>22. باهام خیلی صبوری</p>
<p>23. همیشه حوصله‌م رو داری</p>
<p>24. پشتمی توی همه چی</p>
<p>25. خوب منو می‌فهمی</p>
<p>26. نظرم برات مهمه</p>
<p>27. به رابطه وفاداری</p>
<p>28. خنده‌هات منو زنده می‌کنه</p>
<p>29. همیشه در حال رشدی</p>
<p>30. عمیق فکر می‌کنی</p>
<p>31. صدات آرامم می‌کنه</p>
<p>32. خیلی صبوری همیشه</p>
<p>33. انگیزه می‌دی همیشه</p>
<p>34. پایبند تعهداتی</p>
<p>35. تو هر شرایطی کنارمی</p>
<p>36. دنبال رشد شخصی‌ای</p>
<p>37. منطقی و باهوشی</p>
<p>38. به خانواده اهمیت می‌دی</p>
<p>39. همیشه صادقی باهام</p>
<p>40. دلت خیلی بزرگه</p>
<p>41. دقیق و حواست جمعه</p>
<p>42. خیلی پذیرا و بازی</p>
<p>43. با آرامش دلگرمم می‌کنی</p>
<p>44. بدون قضاوت گوش می‌دی</p>
<p>45. کمک‌کردن برات لذته</p>
<p>46. مسئولیت‌پذیری فوق‌العاده‌ای</p>
<p>47. همیشه منو اول می‌ذاری</p>
<p>48. قابل اعتمادی همیشه</p>
<p>49. از اشتباهاتت یاد می‌گیری</p>
<p>50. مؤدب و محترمی</p>
<p>51. انرژی مثبتی داری</p>
<p>52. آرومت توی بحرانا</p>
<p>53. با هدف زندگی می‌کنی</p>
<p>54. زندگی‌تو متعادل می‌کنی</p>
<p>55. احساساتتو راحت می‌گی</p>
<p>56. با تغییرات کنار میای</p>
<p>57. منو همینطور که هستم، می‌خوای</p>
<p>58. خواسته‌هاتو واضح می‌گی</p>
<p>59. منطقی تصمیم می‌گیری</p>
<p>60. شوخ و با نمکی</p>
<p>61. همیشه در حال یادگیری</p>
<p>62. به وقتم احترام می‌ذاری</p>
<p>63. محیط امن می‌سازی</p>
<p>64. تعارض‌هارو خوب حل می‌کنی</p>
<p>65. نگاهت مثبته به زندگی</p>
<p>66. به سلامت اهمیت می‌دی</p>
<p>67. خلاق و مبتکری</p>
<p>68. حال دلمو می‌فهمی</p>
<p>69. خوشحال کردنم برات مهمه</p>
<p>70. روابط اجتماعی خوبی داری</p>
<p>71. دلسوز همه‌ای</p>
<p>72. به وعده‌هات وفاداری</p>
<p>73. منو تشویق می‌کنی</p>
<p>74. جزئیات کوچیکو می‌بینی</p>
<p>75. به رابطه‌مون اهمیت می‌دی</p>
<p>76. احساساتمو می‌فهمی</p>
<p>77. همیشه آرومی می‌سازی</p>
<p>78. منطقی و مهربونی</p>
<p>79. بی‌نیاز از تظاهر</p>
<p>80. رویاهای مشترک داریم</p>
<p>81. ارتباطت باهام صمیمیه</p>
<p>82. اشتباهاتتو می‌پذیری</p>
<p>83. خوب گوش می‌دی</p>
<p>84. باهام همفکری می‌کنی</p>
<p>85. صبور در سختی‌هایی</p>
<p>86. آینده‌نگر و امیدی</p>
<p>87. شفاف و صادقی</p>
<p>88. حریم شخصیمو می‌فهمی</p>
<p>89. آزادی‌هامو می‌پذیری</p>
<p>90. اعتماد می‌سازی همیشه</p>
<p>91. خودمو با تو می‌پذیرم</p>
<p>92. تو هر شرایطی دوسم داری</p>
<p>93. منو رشد می‌دی</p>
<p>94. باهم تیم فوق‌العاده‌ایم</p>
<p>95. بی‌قید و شرط مهربونی</p>
<p>96. باهم قوی‌تریم همیشه</p>
<p>97. تفاوت‌هامونو می‌فهمی</p>
<p>98. ارزش‌هامو درک می‌کنی</p>
<p>99. با دلت عاشقمی</p>
<p>100. زندگی با تو قشنگه</p>

  <p style="font-size: 1.4em; font-weight: bold; border: 2px dashed red; padding: 10px; text-align: center;">101. چون تو تویی، و همین کافیه</p>
  <p style="margin-top: 30px;">- مانی</p>
  <p style="margin-top: 30px; font-style: italic;">پ.ن: یه سوپرایز برات توی ماکه گذاشتم، ازش خوب مراقبت کن.</p>
`;
if (!seedTaken) {
    document.getElementById('get-seed-btn').style.display = 'inline-block';
  } else {
    document.getElementById('get-seed-btn').style.display = 'none';
  }

  return;
}
        
      
    }
  });
});

modal.addEventListener('click', () => {
  if (letterStage === 1) {
    modalImg.src = 'images/letter_opened.png';
    caption.textContent = "تو:";
    caption.style.display = 'block';
    rainEmojis();
    letterStage = 2;

  } else if (letterStage === 2) {
    modalImg.src = 'images/letter_opened_v2.png';
    caption.textContent = "🎁 یه چیز بامزه هم برات گذاشتم!";
    flyToInventory('images/cat_pic.png');
    letterStage = 3;

  } else if (letterStage === 3) {
    caption.textContent = "📄 اینم یه ضمیمه‌ی مهم!";
    flyToInventoryWithCallback('images/letter_sheet.png', () => {
      modal.style.display = 'none';
      caption.style.display = 'none';
      isLetterOpened = false;
      letterStage = 0;
      notification.textContent = "📎 یه عکس و یه کاغذ توش بود! کاغذو بردار ببین توش چی نوشه";
      notifySound.currentTime = 0;
      notifySound.play().catch(err => {});
    });
    letterStage = 4;
  } else {
    modal.style.display = 'none';
    caption.style.display = 'none';
    isLetterOpened = false;
    letterStage = 0;
  }
});

function rainEmojis() {
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 20) {
      clearInterval(interval);
      return;
    }

    const emojis = ['🌹', '❤️'];
    for (let i = 0; i < 8; i++) {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-rain';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${Math.random() * window.innerWidth}px`;
      emoji.style.top = `-50px`;
      emoji.style.fontSize = `${20 + Math.random() * 10}px`;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 4000);
    }

    count++;
  }, 250);
}

function flyToInventory(imgSrc) {
  const img = document.createElement('img');
  img.src = imgSrc;
  img.className = 'fly-img';
  document.body.appendChild(img);

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;

  const targetSlot = Array.from(itemSlots).find(slot => slot.children.length === 0);
  if (!targetSlot) return;

  const slotBox = targetSlot.getBoundingClientRect();
  const dx = slotBox.left - startX;
  const dy = slotBox.top - startY;

  setTimeout(() => {
    img.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
    img.style.opacity = '0.7';
  }, 50);

  setTimeout(() => {
    const finalItem = document.createElement('img');
    finalItem.src = imgSrc;
    finalItem.style.width = '100%';
    finalItem.style.borderRadius = '10px';
    finalItem.style.pointerEvents = 'none';
    targetSlot.appendChild(finalItem);
    img.remove();
  }, 1200);
}

function flyToInventoryWithCallback(imgSrc, callback) {
  const img = document.createElement('img');
  img.src = imgSrc;
  img.className = 'fly-img';
  document.body.appendChild(img);

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  img.style.left = `${startX}px`;
  img.style.top = `${startY}px`;

  const targetSlot = Array.from(itemSlots).find(slot => slot.children.length === 0);
  if (!targetSlot) {
    if (callback) callback();
    return;
  }

  const slotBox = targetSlot.getBoundingClientRect();
  const dx = slotBox.left - startX;
  const dy = slotBox.top - startY;

  setTimeout(() => {
    img.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
    img.style.opacity = '0.7';
  }, 50);

  setTimeout(() => {
    const finalItem = document.createElement('img');
    finalItem.src = imgSrc;
    finalItem.style.width = '100%';
    finalItem.style.borderRadius = '10px';
    finalItem.style.pointerEvents = 'none';
    targetSlot.appendChild(finalItem);
    img.remove();
    if (callback) callback();
  }, 1200);
}

const seedBtn = document.getElementById('get-seed-btn');

if (seedBtn) {
  seedBtn.addEventListener('click', () => {
    longTextModal.style.display = 'none';
    seedBtn.style.display = 'none';
    if (!seedTaken) {
      flyToInventory('images/seed.png');
      seedTaken = true;
    }
  });
}

modalImg.addEventListener('click', () => {
  paperSound.currentTime = 0;
  paperSound.play().catch(err => console.warn("⛔ پخش صدای کاغذ شکست خورد:", err));
});

const closeBtn = document.getElementById('close-long-text');
if (closeBtn && longTextModal) {
  closeBtn.addEventListener('click', () => {
    longTextModal.style.display = 'none';
  });
}

const seedButton = document.getElementById('get-seed-btn');
if (seedButton) {
  seedButton.addEventListener('click', () => {
    longTextModal.style.display = 'none';
    notification.textContent = "🌱 این یه دونس، بهترین راه اینه که بریم توی باغچه بکاریمش. روی دونه کلیک کن تا بریم توی باغچه";
    notifySound.currentTime = 0;
    notifySound.play().catch(err => console.warn("⛔ پخش صدای نوتیف بعد از دریافت دونه شکست خورد:", err));
  });
}

const bgImage = document.getElementById('bg-house');
const container = document.getElementById('container');

function fadeOutIn(callback) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'black';
  overlay.style.opacity = 0;
  overlay.style.zIndex = 9999;
  overlay.style.transition = 'opacity 1s';
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.style.opacity = 1;
    setTimeout(() => {
      callback();
      overlay.style.opacity = 0;
      setTimeout(() => overlay.remove(), 1000);
    }, 1000);
  }, 10);
}

function setupInventoryItems() {
  const items = ['shovel.png', 'water.png', 'seed.png'];
  itemSlots.forEach(slot => slot.innerHTML = '');
  items.forEach((item, i) => {
    const img = document.createElement('img');
    img.src = 'images/' + item;
    img.classList.add('draggable');
    img.style.cursor = 'grab';
    img.style.width = '100%';
    img.style.userSelect = 'none';

    let isDragging = false;

    img.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = img.getBoundingClientRect();
      const originalSlot = img.parentElement;
      const originalLeft = rect.left + window.scrollX;
      const originalTop = rect.top + window.scrollY;

      img.style.position = 'absolute';
      img.style.zIndex = 1000;
      img.style.pointerEvents = 'none';
      img.style.width = img.offsetWidth + 'px';
      img.style.height = img.offsetHeight + 'px';
      img.style.transform = 'scale(0.25)';
      img.style.transformOrigin = 'top left';
      img.style.left = originalLeft + 'px';
      img.style.top = originalTop + 'px';
      document.body.appendChild(img);

      function moveAt(pageX, pageY) {
        img.style.left = (pageX - img.offsetWidth * 0.125) + 'px';
        img.style.top = (pageY - img.offsetHeight * 0.125) + 'px';
      }

      function onMouseMove(e) {
        if (isDragging) moveAt(e.pageX, e.pageY);
      }

      function onMouseUp(e) {
        if (isDragging) {
          isDragging = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          img.style.pointerEvents = 'auto';

          if (img.src.includes('shovel.png')) {
            if (!seedPlanted) {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight - window.innerHeight / 3;
              const dropX = e.clientX;
              const dropY = e.clientY;
              const distance = Math.sqrt((dropX - centerX) ** 2 + (dropY - centerY) ** 2);

              if (distance < 100) {
                showHole();
                const digSound = new Audio('sounds/dig.mp3');
                digSound.play().catch(err => console.warn("⛔ پخش صدای کندن شکست خورد:", err));
                notification.textContent = "حالا دونه رو توی چاله بکار";
                notifySound.currentTime = 0;
                notifySound.play().catch(err => {});
              }
            } else if (seedPlanted && !holeFilled) {
              const hole = document.getElementById('hole-img');
              if (hole) {
                const holeRect = hole.getBoundingClientRect();
                const dropX = e.clientX;
                const dropY = e.clientY;
                if (dropX >= holeRect.left && dropX <= holeRect.right &&
                    dropY >= holeRect.top && dropY <= holeRect.bottom) {
                  hole.src = 'images/hole-filled.png';
                  holeFilled = true;
                  const starsSound = new Audio('sounds/stars.mp3');
                  starsSound.play().catch(err => console.warn("⛔ پخش صدای ستاره شکست خورد:", err));
                  notification.textContent = "💧 حالا به دونت آب بده";
                  notifySound.currentTime = 0;
                  notifySound.play().catch(err => {});
                }
              }
            }
          }

          if (img.src.includes('seed.png') && holeDisplayed && !seedPlanted) {
            const hole = document.getElementById('hole-img');
            if (hole) {
              const holeRect = hole.getBoundingClientRect();
              const dropX = e.clientX;
              const dropY = e.clientY;
              const distance = Math.sqrt((dropX - (holeRect.left + holeRect.width / 2)) ** 2 + (dropY - (holeRect.top + holeRect.height / 2)) ** 2);
              
              if (distance < 100) {
                seedPlanted = true;
                notification.textContent = "حالا با بیل چاله رو پر کن";
                notifySound.currentTime = 0;
                notifySound.play().catch(err => console.warn("⛔ پخش صدای نوتیف بعد از کاشتن دونه شکست خورد:", err));
                img.remove();
                const slotImg = originalSlot.querySelector('img');
                if (slotImg) slotImg.remove();
              } else {
                img.style.position = '';
                img.style.zIndex = '';
                img.style.left = '';
                img.style.top = '';
                img.style.transform = '';
                img.style.width = '100%';
                img.style.height = 'auto';
                originalSlot.appendChild(img);
              }
            } else {
              img.style.position = '';
              img.style.zIndex = '';
              img.style.left = '';
              img.style.top = '';
              img.style.transform = '';
              img.style.width = '100%';
              img.style.height = 'auto';
              originalSlot.appendChild(img);
            }
          }

          if (document.body.contains(img)) {
            img.style.position = '';
            img.style.zIndex = '';
            img.style.left = '';
            img.style.top = '';
            img.style.transform = '';
            img.style.width = '100%';
            img.style.height = 'auto';
            originalSlot.appendChild(img);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    itemSlots[i].appendChild(img);
  });
}

function showHole() {
  if (holeDisplayed) return;
  const hole = document.createElement('img');
  hole.src = 'images/hole.png';
  hole.id = 'hole-img'; // اضافه کردن id به چاله
  hole.style.position = 'absolute';
  hole.style.left = '46%';
  hole.style.top = '73%';
  hole.style.width = '150px';
  hole.style.height = '150px';
  hole.style.transform = 'translate(-50%, -50%)';
  hole.style.zIndex = '100';
  document.body.appendChild(hole);
  holeDisplayed = true;
}

document.addEventListener('click', () => {
  const seedItem = Array.from(document.querySelectorAll('.item-slot img')).find(img => img.src.includes('seed.png'));
  if (seedItem) {
    seedItem.addEventListener('click', (e) => {
      e.stopPropagation();
      bgMusic.pause();
      fadeOutIn(() => {
        bgImage.src = 'images/garden.png';
        notifySound.currentTime = 0;
        notifySound.play().catch(err => console.warn("⛔ صدای نوتیف باغ شکست خورد:", err));
        if (mailbox && mailbox.parentNode) mailbox.remove();

        const gardenMusic = new Audio(' Preferablygarden_music.mp3');
        gardenMusic.loop = true;
        gardenMusic.volume = 0.5;
        gardenMusic.play().catch(err => console.warn('⛔ پخش موزیک باغ شکست خورد:', err));

        notification.textContent = "🌱 الان که توی باغچه ایم بهتره زودتر دونه رو بکاریم - از بیل برای کندن زمین استفاده کن";

        setupInventoryItems();
      });
    }, { once: true });
  }
});

document.addEventListener('click', function (e) {
  const target = e.target;
  if (target.tagName === 'IMG' && target.src.includes('seed.png')) {
    bgMusic.pause();
    fadeOutIn(() => {
      bgImage.src = 'images/garden.png';
      notifySound.currentTime = 0;
      notifySound.play().catch(err => console.warn("⛔ صدای نوتیف باغ شکست خورد:", err));
      if (mailbox && mailbox.parentNode) mailbox.remove();

      const gardenMusic = new Audio('garden_music.mp3');
      gardenMusic.loop = true;
      gardenMusic.volume = 0.5;
      gardenMusic.play().catch(err => console.warn('⛔ پخش موزیک باغ شکست خورد:', err));

      notification.textContent = "🌱 الان که توی باغچه ایم بهتره زودتر دونه رو بکاریم - از بیل برای کندن زمین استفاده کن";

      setupInventoryItems();
    });
  }
});

document.getElementById("get-seed-btn").addEventListener("click", () => {
  const slot = Array.from(itemSlots).find(slot => slot.children.length === 0);
  if (slot) {
    const seed = document.createElement("img");
    seed.src = "images/seed.png";
    seed.style.width = "100%";
    seed.style.borderRadius = "10px";
    seed.style.pointerEvents = "auto";
    seed.style.cursor = "pointer";
    slot.appendChild(seed);
  }
});

// کدهای اضافی که توی فایل اصلی بودن و نیازی به تغییر نداشتن حذف شدن از اینجا