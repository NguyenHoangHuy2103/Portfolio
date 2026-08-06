(function () {
  'use strict';

  /* ---------- PROGRESS BAR ---------- */
  var prog = document.getElementById('progress');
  function updateProgress() {
    var h = document.documentElement;
    var pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    prog.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ---------- SCROLLSPY ---------- */
  var sections = ['about', 'projects', 'skills', 'accomplishments', 'contact'];
  var navLinks = document.querySelectorAll('.nav-links a[data-section]');
  function updateScrollspy() {
    var current = '';
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-section') === current);
    });
  }

  /* ---------- NAV SCROLL STYLE ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    updateProgress();
    updateScrollspy();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  function revealAll() { revealEls.forEach(function (el) { el.classList.add('rv'); }); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('rv'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.rv)').forEach(function (el) { el.classList.add('rv'); });
    }, 800);
  } else {
    revealAll();
  }

  /* ---------- LIVE CLOCK ---------- */
  var clock = document.getElementById('clock');
  function tickClock() {
    try {
      clock.textContent = 'TP.HCM — ' + new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit'
      }).format(new Date()) + ' GMT+7';
    } catch (e) {}
  }
  tickClock();
  setInterval(tickClock, 30000);

  /* ---------- COPY EMAIL ---------- */
  var copyBtn = document.getElementById('copy-mail');
  var copyTip = document.getElementById('copy-tip');
  var tipTimer;
  function doCopy() {
    navigator.clipboard.writeText('jayker03212k5@gmail.com').then(function () {
      copyTip.classList.add('show');
      clearTimeout(tipTimer);
      tipTimer = setTimeout(function () { copyTip.classList.remove('show'); }, 2000);
    });
  }
  copyBtn.addEventListener('click', doCopy);
  copyBtn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') doCopy(); });

  /* ---------- AVATAR PLACEHOLDER ---------- */
  var avatarImg = document.getElementById('avatar-img');
  var avatarPh = document.getElementById('avatar-ph');
  if (!avatarImg.src || avatarImg.src.indexOf('YOUR_PHOTO') > -1) {
    avatarImg.style.display = 'none';
    avatarPh.style.display = 'flex';
  } else {
    avatarImg.addEventListener('load', function () { avatarPh.style.display = 'none'; });
    avatarImg.addEventListener('error', function () { avatarImg.style.display = 'none'; avatarPh.style.display = 'flex'; });
  }

  /* ---------- HAMBURGER ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  window.closeDrawer = function () {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  };

})();

/* ---------- LANGUAGE TOGGLE ---------- */
var currentLang = 'vi';

var i18n = {
  vi: {
    'nav.about':        'Giới thiệu',
    'nav.projects':     'Dự án',
    'nav.projects.full':'Dự án nổi bật',
    'nav.skills':       'Kỹ năng',
    'nav.acc':          'Thành tích',
    'nav.contact':      'Liên hệ',
    'hero.eyebrow':     'Portfolio — TP. Hồ Chí Minh — 2026',
    'hero.status':      'Open to work — Đang thực tập @ Xuân Tín Logistics',
    'hero.role':        'Không chờ đủ giỏi mới làm, biết mình còn thiếu nhiều — nên không được ngưng làm, làm để trở nên đủ giỏi.<br>Thứ duy nhất đáng sợ là đứng yên.',
    'fact.edu':         'Software Engineering, 2023–2027',
    'fact.intern.title':'Thực tập 02/2026 — nay · Remote',
    'fact.intern.sub':  'tại Vận Tải Xuân Tín · Vận hành & Phát triển hệ thống',
    'fact.proj.title':  '3 dự án nổi bật',
    'fact.proj.sub':    '1 hệ thống production thật',
    'cta.projects':     'Xem dự án',
    'cta.contact':      'Liên hệ',
    'avatar.hint':      'Thêm ảnh của bạn vào đây',
    'about.lede':       'Mình là <em>Huy</em> — sinh viên Software Engineering tại FPT University HCMC, hiện đang vận hành &amp; phát triển hệ thống thật tại Xuân Tín Logistics.',
    'card.edu.title':   'Học vấn <span>2023 — 2027</span>',
    'card.edu.body':    '<b>FPT University HCMC</b> — chuyên ngành Software Engineering. Học tiếng Nhật như ngôn ngữ thứ 3 trong chương trình.',
    'card.intern.title':'Thực tập · Remote <span>07/2026 — nay</span>',
    'card.intern.body': '<b>Công ty TNHH MTV Vận Tải Xuân Tín Logistics</b> — Vận hành &amp; Phát triển hệ thống: xây hệ thống giao hàng production, landing page công ty, vận hành hạ tầng IT nội bộ.',
    'card.lang.title':  'Ngôn ngữ',
    'lang.vi':          'Tiếng Việt',  'lang.vi.level': 'Bản ngữ',
    'lang.en':          'Tiếng Anh',   'lang.en.level': 'Giao tiếp',
    'lang.ja':          'Tiếng Nhật',  'lang.ja.level': 'Cơ bản — ngôn ngữ thứ 3 tại FPT',
    'card.goal.title':  'Định hướng',
    'card.goal.body':   'Backend Developer / Full-stack Developer — muốn phát triển sâu về DevOps, CI/CD và kiến trúc hệ thống trong môi trường chuyên nghiệp.',
    'tag.production':   'Production', 'tag.research': 'Research', 'tag.web': 'Web', 'tag.team': 'Team',
    'proj4.desc':       'Hệ thống đặt lịch rửa xe tự động — quản lý booking, danh mục dịch vụ và lịch nhân viên. Dự án học kỳ 5 môn SWP tại FPT University.',
    'proj4.extra':      '<b>Vai trò:</b> Backend Developer — thiết kế và xây dựng RESTful API cho toàn bộ nghiệp vụ đặt lịch.',
    'proj1.desc':       'Hệ thống quản lý giao hàng nội bộ phục vụ vận hành hằng ngày của Xuân Tín Logistics. Phụ trách toàn bộ: thiết kế hệ thống, phát triển, vận hành server và quản lý domain production.',
    'flow.create':      'Tạo đơn', 'flow.transfer': 'Chuyển hàng', 'flow.deliver': 'Giao hàng', 'flow.payment': 'Xác nhận thanh toán',
    'proj1.extra':      '<b>Phân quyền:</b> Admin · Staff · Accountant — mỗi vai trò một luồng thao tác riêng.',
    'link.live':        'Xem live ↗', 'link.demo': 'Live Demo ↗',
    'proj2.desc':       'Dẫn nhóm 5 người thiết kế và thực thi nghiên cứu thực nghiệm so sánh 3 phương pháp sinh test REST API. Ground truth được đặt bằng pre-seeded mutation faults — đánh giá khách quan, đo bằng Coverage và Fault-detection Recall.',
    'proj2.extra':      '<b>Vai trò:</b> Project Lead — dẫn dắt nhóm 5 thành viên thiết kế và thực thi nghiên cứu.',
    'proj3.desc':       'Website giới thiệu công ty — đa trang, deploy production với custom domain.',
    'skill.lang':       'Ngôn ngữ lập trình', 'skill.fw': 'Framework & Runtime', 'skill.db': 'Cơ sở dữ liệu', 'skill.tools': 'Công cụ & Quy trình',
    'acc1.title':       'Production solo end-to-end',
    'acc1.desc':        'Tự tay xây và vận hành hoàn toàn hệ thống giao hàng production đang phục vụ doanh nghiệp thực tế — từ code đến server, domain, và ops.',
    'acc2.title':       'Research Lead — SWT301',
    'acc2.desc':        'Dẫn nhóm 5 người thiết kế và thực thi nghiên cứu thực nghiệm so sánh LLM vs Manual vs EvoMaster. Proposal được giảng viên duyệt v1.2.',
    'acc3.title':       'Thực tập năm 3',
    'acc3.desc':        'Được nhận thực tập tại doanh nghiệp thực tế khi còn là sinh viên năm 3 — vận hành và phát triển hệ thống IT production.',
    'acc4.title':       'Đa ngôn ngữ',
    'acc4.desc':        'Tiếng Anh giao tiếp tốt. Tiếng Nhật cơ bản — ngôn ngữ thứ 3 trong chương trình đào tạo tại FPT University.',
    'ct.tag':           '05 — Liên hệ',
    'ct.head':          'Có ý tưởng?<br /><em>Cùng build.</em>',
    'ct.copied':        '✓ Đã copy!',
    'ct.top':           'Về đầu trang ↑'
  },
  en: {
    'nav.about':        'About',
    'nav.projects':     'Projects',
    'nav.projects.full':'Featured Projects',
    'nav.skills':       'Skills',
    'nav.acc':          'Achievements',
    'nav.contact':      'Contact',
    'hero.eyebrow':     'Portfolio — Ho Chi Minh City — 2026',
    'hero.status':      'Open to work — Interning @ Xuan Tin Logistics',
    'hero.role':        'Never waiting to be good enough to start, knowing there\'s still much to learn.<br>So never stopping, keep building to become good enough.<br>The only thing worth fearing is standing still.',
    'fact.edu':         'Software Engineering, 2023–2027',
    'fact.intern.title':'Internship 02/2026 — Present · Remote',
    'fact.intern.sub':  'at Xuan Tin Logistics · Ops & Development',
    'fact.proj.title':  '3 featured projects',
    'fact.proj.sub':    '1 real production system',
    'cta.projects':     'View Projects',
    'cta.contact':      'Contact',
    'avatar.hint':      'Add your photo here',
    'about.lede':       'I\'m <em>Huy</em> — a Software Engineering student at FPT University HCMC, currently operating &amp; developing real systems at Xuan Tin Logistics.',
    'card.edu.title':   'Education <span>2023 — 2027</span>',
    'card.edu.body':    '<b>FPT University HCMC</b> — majoring in Software Engineering. Studying Japanese as a 3rd language in the program.',
    'card.intern.title':'Internship · Remote <span>07/2026 — Present</span>',
    'card.intern.body': '<b>Xuan Tin Logistics Co., Ltd</b> — System Ops &amp; Development: built the production delivery system, company landing page, and managed internal IT infrastructure.',
    'card.lang.title':  'Languages',
    'lang.vi':          'Vietnamese',  'lang.vi.level': 'Native',
    'lang.en':          'English',     'lang.en.level': 'Conversational',
    'lang.ja':          'Japanese',    'lang.ja.level': 'Basic — 3rd language at FPT',
    'card.goal.title':  'Career Goal',
    'card.goal.body':   'Backend Developer / Full-stack Developer — aiming to grow in DevOps, CI/CD, and system architecture in a professional environment.',
    'tag.production':   'Production', 'tag.research': 'Research', 'tag.web': 'Web', 'tag.team': 'Team',
    'proj4.desc':       'Automated car wash booking system — manages appointments, service catalog, and staff scheduling. Academic project, Semester 5 SWP at FPT University.',
    'proj4.extra':      '<b>Role:</b> Backend Developer — designed and built RESTful APIs for the full booking workflow.',
    'proj1.desc':       'Internal delivery management system serving the daily operations of Xuan Tin Logistics. Solely responsible for system design, development, server operations, and production domain management.',
    'flow.create':      'Create Order', 'flow.transfer': 'Transfer', 'flow.deliver': 'Delivery', 'flow.payment': 'Payment Confirmation',
    'proj1.extra':      '<b>Role-based access:</b> Admin · Staff · Accountant — each with a dedicated workflow.',
    'link.live':        'View live ↗', 'link.demo': 'Live Demo ↗',
    'proj2.desc':       'Led a team of 5 to design and execute an empirical study comparing 3 REST API test generation methods. Ground truth established via pre-seeded mutation faults — objectively measured by Coverage and Fault-detection Recall.',
    'proj2.extra':      '<b>Role:</b> Project Lead — led 5 members through the full research design and execution.',
    'proj3.desc':       'Company landing website — multi-page, deployed to production with a custom domain.',
    'skill.lang':       'Programming Languages', 'skill.fw': 'Frameworks & Runtime', 'skill.db': 'Databases', 'skill.tools': 'Tools & Workflow',
    'acc1.title':       'Production Solo End-to-End',
    'acc1.desc':        'Solely built and operated a production delivery system serving a real business — from code to server, domain, and ops.',
    'acc2.title':       'Research Lead — SWT301',
    'acc2.desc':        'Led a team of 5 to design and execute an empirical study comparing LLM vs Manual vs EvoMaster. Proposal approved by lecturer at v1.2.',
    'acc3.title':       'Year-3 Internship',
    'acc3.desc':        'Secured an internship at a real company as a 3rd-year student — operating and developing production IT systems.',
    'acc4.title':       'Multilingual',
    'acc4.desc':        'Conversational English. Basic Japanese — studied as a 3rd language in FPT University\'s program.',
    'ct.tag':           '05 — Contact',
    'ct.head':          'Got an idea?<br /><em>Let\'s build.</em>',
    'ct.copied':        '✓ Copied!',
    'ct.top':           'Back to top ↑'
  }
};

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (i18n[lang][key] !== undefined) el.innerHTML = i18n[lang][key];
  });
  document.documentElement.lang = lang;
}

var langBtn = document.getElementById('lang-btn');
if (langBtn) {
  langBtn.addEventListener('click', function() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    langBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';
    applyLang(currentLang);
  });
}

/* ---------- TYPEWRITER ---------- */
window.addEventListener('load', function () {
  var el = document.getElementById('tw');
  if (!el) return;

  var words = ['Backend Developer', 'Full-stack Developer', 'Research Lead', 'System Builder'];
  var wi = 0, ci = 0, deleting = false;

  el.textContent = words[0].substring(0, 1);

  var tick = function() {
    var w = words[wi];
    if (!deleting) {
      ci = ci + 1;
      el.textContent = w.substring(0, ci);
      if (ci >= w.length) {
        deleting = true;
        setTimeout(tick, 2000);
      } else {
        setTimeout(tick, 90);
      }
    } else {
      ci = ci - 1;
      el.textContent = w.substring(0, ci);
      if (ci <= 0) {
        ci = 0;
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 350);
      } else {
        setTimeout(tick, 55);
      }
    }
  };

  setTimeout(tick, 400);
});
