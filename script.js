/**
 * script.js
 * Client-side logic for HAPPY Program Questionnaire
 * APPS_SCRIPT_URL is set to your deployed Apps Script Web App (exec) URL.
 *
 * Save this file to your GitHub repo alongside index.html and styles.css.
 */

/* ========== Configuration ========== */
// Replace this value only if you re-deploy Apps Script and get a new /exec URL.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKG62FxQvouPswxEiWHob4YZnXY0vc7bZuGRPy2FZkS0SGoWPYbE51ntTiyn531zLdWQ/exec';

/* ========== Reference Data ========== */
const REFERENCE = {
  regions: [
    { id: 'ASH', label: 'Ashanti' },
    { id: 'UWR', label: 'Upper West' },
    { id: 'UER', label: 'Upper East' },
    { id: 'VOT', label: 'Volta' },
    { id: 'OTI', label: 'Oti' },
    { id: 'BON', label: 'Bono' },
    { id: 'BNE', label: 'Bono East' },
    { id: 'AHF', label: 'Ahafo' },
    { id: 'NOR', label: 'Northern' },
    { id: 'SAV', label: 'Savannah' },
    { id: 'EAS', label: 'Eastern' },
    { id: 'WES', label: 'Western' },
    { id: 'WEN', label: 'Western North' },
    { id: 'CEN', label: 'Central' },
    { id: 'GAC', label: 'Greater Accra' },
    { id: 'NEA', label: 'North East' }
  ],
  districtsByRegion: {
    'NEA': ['Bunkpurugu-Nyankpanduri','Chereponi','East Mamprusi','Mamprugu Moagduri','West Mamprusi','Yunyoo-Nasuan'],
    'UWR': ['Daffiama-Bussie-Issa','Jirapa','Lambussie','Lawra','Nadowli-Kaleo','Nandom','Sissala East','Sissala West','Wa East','Wa Municipal','Wa West'],
    'UER': ['Bawku Municipal','Bawku West','Binduri','Bolgatanga East','Bolgatanga Municipal','Bongo','Builsa North','Builsa South','Garu','Kassena-Nankana East','Kassena-Nankana West','Nabdam','Pusiga','Talensi','Tempane'],
    'VOT': ['Adaklu','Afadzato South','Agotime-Ziope','Akatsi North','Akatsi South','Anloga','Central Tongu','Ho Municipal','Ho West','Hohoe Municipal','Keta Municipal','Ketu North','Ketu South','Kpando Municipal','North Dayi','North Tongu','South Dayi','South Tongu'],
    'OTI': ['Biakoye','Guan','Jasikan','Kadjebi','Krachi East','Krachi Nchumuru','Krachi West','Nkwanta North','Nkwanta South'],
    'BON': ['Banda','Berekum East','Berekum West','Dormaa Central','Dormaa East','Dormaa West','Jaman North','Jaman South','Sunyani','Sunyani West','Tain','Wenchi'],
    'BNE': ['Atebubu-Amantin','Kintampo North','Kintampo South','Nkoranza North','Nkoranza South','Pru East','Pru West','Sene East','Sene West','Techiman Municipal','Techiman North'],
    'AHF': ['Asunafo North','Asunafo South','Asutifi North','Asutifi South','Tano North','Tano South'],
    'NOR': ['Gushegu','Karaga','Kpandai','Kumbungu','Mion','Nanumba North','Nanumba South','Nanton','Saboba','Sagnarigu','Savelugu','Tamale Metropolitan','Tatale Sanguli','Tolon','Yendi Municipal','Zabzugu','North Gonja','Central Gonja'],
    'SAV': ['Bole','Central Gonja','East Gonja','North East Gonja','North Gonja','Sawla-Tuna-Kalba','West Gonja'],
    'ASH': ['Adansi Asokwa','Adansi North','Adansi South','Afigya Kwabre North','Afigya Kwabre South','Ahafo Ano North','Ahafo Ano South East','Ahafo Ano South West','Amansie Central','Amansie South','Amansie West','Asante Akim Central','Asante Akim North','Asante Akim South','Asokore Mampong','Atwima Kwanwoma','Atwima Mponua','Atwima Nwabiagya North','Atwima Nwabiagya South','Bekwai','Bosome Freho','Bosomtwe','Ejisu','Ejura Sekyedumase','Juaben','Kumasi Metropolitan','Kwabre East','Kwadaso','Mampong','Obuasi East','Obuasi Municipal','Offinso Municipal','Offinso North','Oforikrom','Old Tafo','Sekyere Afram Plains','Sekyere Central','Sekyere East','Sekyere Kumawu','Sekyere South','Suame','Asokwa','Bantama'],
    'EAS': ['Abuakwa North','Abuakwa South','Achiase','Akwapim North','Akwapim South','Akyemansa','Asene Manso Akroso','Asuogyaman','Atiwa East','Atiwa West','Ayensuano','Birim North','Birim South','Birem Central','Denkyembour','Fanteakwa North','Fanteakwa South','Kwaebibirem','Kwahu Afram Plains North','Kwahu Afram Plains South','Kwahu East','Kwahu South','Kwahu West','Lower Manya Krobo','New Juaben North','New Juaben South','Nsawam Adoagyiri','Okere','Suhum','Upper Manya Krobo','Upper West Akim','Yilo Krobo'],
    'WES': ['Ahanta West','Effia-Kwesimintsim','Ellembelle','Jomoro','Mpohor','Nzema East','Prestea-Huni Valley','Sekondi-Takoradi Metropolitan','Shama','Tarkwa-Nsuaem','Wassa Amenfi Central','Wassa Amenfi East','Wassa Amenfi West','Wassa East'],
    'WEN': ['Aowin','Bia East','Bia West','Bibiani-Anhwiaso-Bekwai','Bodi','Juaboso','Sefwi Akontombra','Sefwi Wiawso Municipal','Suaman'],
    'CEN': ['Abura-Asebu-Kwamankese','Agona East','Agona West','Ajumako-Enyan-Essiam','Asikuma-Odoben-Brakwa','Assin Central','Assin North','Assin South','Awutu Senya','Awutu Senya East','Cape Coast Metropolitan','Effutu','Ekumfi','Gomoa Central','Gomoa East','Gomoa West','Komenda-Edina-Eguafo-Abrem','Mfantsiman','Twifo-Atti Morkwa','Twifo Hemang Lower Denkyira','Upper Denkyira East','Upper Denkyira West'],
    'GAC': ['Ablekuma Central','Ablekuma North','Ablekuma West','Accra Metropolitan','Ada East','Ada West','Adenta','Ashaiman','Ayawaso East','Ayawaso North','Ayawaso West','Ga Central','Ga East','Ga North','Ga South','Ga West','Korle Klottey','Kpone Katamanso','Krowor','La Dade Kotopon','La Nkwantanang Madina','Ledzokuku','Ningo Prampram','Okaikwei North','Shai Osudoku','Tema Metropolitan','Tema West','Weija Gbawe']
  }
};

/* ========== DOM helpers ========== */
function $(id){ return document.getElementById(id); }
function show(el){ if(el) el.classList.remove('hidden'); }
function hide(el){ if(el) el.classList.add('hidden'); }

/* ========== Validation & formatting helpers ========== */
function isNumeric(str){ return /^\d+$/.test(String(str)); }
function validatePhone(phone){ const cleaned = (phone||'').replace(/\D/g,''); return /^0\d{9}$/.test(cleaned); }
function formatPhone(phone){ const cleaned = (phone||'').replace(/\D/g,''); return cleaned.slice(0,10); }
function validateGhanaCard(id){ const cleaned = (id||'').replace(/\D/g,''); return cleaned.length === 10; }
function formatGhanaCardInput(raw){ const digits = (raw||'').replace(/\D/g,'').slice(0,10); if (!digits) return ''; return `GHA-${digits}`; }
function validateVoterId(id){ if (!id) return false; return String(id).trim().length === 10; }

/* ========== Age helpers ========== */
function calculateAgeFromDOB(dobIso){ if (!dobIso) return null; const b = new Date(dobIso); const now = new Date(); let age = now.getFullYear() - b.getFullYear(); const m = now.getMonth() - b.getMonth(); if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--; return age; }
function deriveAgeGroup(age){ if (age === null || age === undefined) return ''; return (age >= 15 && age <= 35) ? 'Youth' : 'Non-Youth'; }
function deriveYouthBucket(age){ if (age >= 15 && age <= 17) return '15-17'; if (age >= 18 && age <= 24) return '18-24'; if (age >= 25 && age <= 29) return '25-29'; if (age >= 30 && age <= 35) return '30-35'; return ''; }

/* ========== Cascading maps ========== */
const industryMap = {
  'Agriculture and Agri-Business': ['Crop Farming','Livestock & Animal Husbandry','Aquaculture & Fisheries','Forestry & Logging','Agro-processing'],
  'IT and Engineering': ['IT Software and Digital Services','Hardware','Telecoms','Engineering Services'],
  'Manufacturing and Processing': ['Food and Beverage Production','Textiles and Apparel','Chemicals and Pharmaceuticals','Metals and Machinery'],
  'Trade and Retail': ['Wholesale','Retail','E-commerce'],
  'Hospitality and Tourism': ['Hotels and Lodging','Restaurants and Catering','Tour Operators'],
  'Healthcare and Wellness': ['Hospitals and Clinics','Pharmacies','Wellness Services'],
  'Education and Training': ['Schools and Universities','Vocational Training','EdTech'],
  'Finance and Insurance': ['Banking and Microfinance','Insurance and Pensions','Fintech'],
  'Logistics, Trade and Transport': ['Transport and Warehousing','Courier Services','Freight Forwarding'],
  'Creative Arts and Media': ['Entertainment and Media','Design','Publishing'],
  'Construction & Real Estate': ['Building and Civil Construction','Real Estate and Property Management'],
  'Energy & Utilities': ['Power Generation and Renewables','Water Supply and Waste Management'],
  'Mining & Extractive': ['Gold and Precious Mineral Mining','Quarrying and Industrial Minerals'],
  'Public Safety & Security': ['Security Services','Defense']
};

const jobTypeMap = {
  'Crop Farming': ['Field Worker','Farm Manager','Agronomy Technician'],
  'Livestock & Animal Husbandry': ['Animal Husbandry Assistant','Veterinary Technician'],
  'IT Software and Digital Services': ['Developer','QA','Systems Analyst'],
  'Food and Beverage Production': ['Machine Operator','Quality Inspector'],
  'Wholesale': ['Sales Representative','Store Manager'],
  'Hotels and Lodging': ['Front Desk','Housekeeping Supervisor'],
  'Hospitals and Clinics': ['Nurse','Clinical Officer']
};

const jobRoleMap = {
  'Developer': ['Frontend Developer','Backend Developer','Fullstack Developer'],
  'Field Worker': ['Harvester','Planter','Irrigation Assistant'],
  'Machine Operator': ['Operator Level 1','Operator Level 2']
};

/* ========== Initialization & event wiring ========== */
document.addEventListener('DOMContentLoaded', () => {
  // Populate implementing partners
  const partners = ['Jobberman','Partner A','Partner B'];
  const ip = $('implementingPartner');
  partners.forEach(p => ip.add(new Option(p,p)));

  // Populate regions
  const regionSel = $('region');
  REFERENCE.regions.forEach(r => regionSel.add(new Option(r.label, r.id)));
  const placementRegion = $('placementRegion');
  const workRegion = $('workRegion');
  const placementWorkRegion = $('placementWorkRegion');
  REFERENCE.regions.forEach(r => {
    placementRegion.add(new Option(r.label, r.id));
    workRegion.add(new Option(r.label, r.id));
    placementWorkRegion.add(new Option(r.label, r.id));
  });

  // District population handlers
  regionSel.addEventListener('change', e => populateDistricts(e.target.value, 'district'));
  placementRegion.addEventListener('change', e => populateDistricts(e.target.value, 'placementDistrict'));
  workRegion.addEventListener('change', e => populateDistricts(e.target.value, 'workDistrict'));
  placementWorkRegion.addEventListener('change', e => populateDistricts(e.target.value, 'placementWorkDistrict'));

  // Employment status -> show baseline employment
  $('employmentStatus').addEventListener('change', e => {
    if (e.target.value === 'Employed') show($('baselineEmploymentBlock')); else hide($('baselineEmploymentBlock'));
  });

  // Training / placement toggles
  $('trainedByPartner').addEventListener('change', e => {
    if (e.target.value === 'Yes') show($('trainingBlock')); else hide($('trainingBlock'));
  });
  $('placedByPartner').addEventListener('change', e => {
    if (e.target.value === 'Yes') show($('placementBlock')); else hide($('placementBlock'));
  });

  // Disability -> specify
  $('disabilityStatus').addEventListener('change', e => {
    if (e.target.value === 'Yes') show($('specifyDisabilityWrap')); else hide($('specifyDisabilityWrap'));
  });
  $('specifyDisability').addEventListener('change', e => {
    if (e.target.value === 'Other') show($('specifyDisabilityOtherWrap')); else hide($('specifyDisabilityOtherWrap'));
  });

  // Education other
  $('educationLevel').addEventListener('change', e => {
    if (e.target.value === 'Other') show($('educationOtherWrap')); else hide($('educationOtherWrap'));
  });

  // ID type -> Ghana Card show
  $('idType').addEventListener('change', e => {
    if (e.target.value === 'Ghana Card') show($('ghanaCardWrap')); else hide($('ghanaCardWrap'));
  });

  // Ghana Card formatting & validation
  const gEl = $('ghanaCardId');
  if (gEl) {
    gEl.addEventListener('input', e => {
      const formatted = formatGhanaCardInput(e.target.value);
      e.target.value = formatted;
      e.target.setCustomValidity(validateGhanaCard(formatted) ? '' : 'Ghana Card must contain 10 digits.');
    });
  }

  // Telephone formatting & validation
  $('telephone').addEventListener('blur', e => {
    e.target.value = formatPhone(e.target.value);
    if (!validatePhone(e.target.value)) e.target.setCustomValidity('Phone must be 10 digits and start with 0.');
    else e.target.setCustomValidity('');
  });

  // DOB -> Age, AgeGroup, YouthBucket
  $('dob').addEventListener('change', e => {
    const dob = e.target.value;
    const age = calculateAgeFromDOB(dob);
    const ageEl = $('age'); if (ageEl) ageEl.value = age || '';
    const ageGroupEl = $('participantTypeAge'); if (ageGroupEl) ageGroupEl.value = deriveAgeGroup(age) || '';
    const bucket = deriveYouthBucket(age);
    if (bucket) { $('youthBucket').value = bucket; show($('youthBucketWrap')); } else { $('youthBucket').value = ''; hide($('youthBucketWrap')); }
  });

  // Sector -> Industry -> JobType -> JobRole (baseline & placement)
  ['currentSector','sector'].forEach(id => {
    const el = $(id);
    if (!el) return;
    Object.keys(industryMap).forEach(s => el.add(new Option(s,s)));
    el.addEventListener('change', e => {
      const targetIndustry = id === 'currentSector' ? 'currentIndustry' : 'industry';
      const targetJobType = id === 'currentSector' ? 'currentJobType' : 'jobType';
      const targetJobRole = id === 'currentSector' ? 'currentJobRole' : 'jobRole';
      const list = $(targetIndustry); list.innerHTML = '<option value="">Select</option>';
      (industryMap[e.target.value]||[]).forEach(i => list.add(new Option(i,i)));
      $(targetJobType).innerHTML = '<option value="">Select</option>';
      $(targetJobRole).innerHTML = '<option value="">Select</option>';
    });
  });

  // Industry -> JobType
  ['currentIndustry','industry'].forEach(id => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('change', e => {
      const targetJobType = id === 'currentIndustry' ? 'currentJobType' : 'jobType';
      const targetJobRole = id === 'currentIndustry' ? 'currentJobRole' : 'jobRole';
      const list = $(targetJobType); list.innerHTML = '<option value="">Select</option>';
      (jobTypeMap[e.target.value]||[]).forEach(i => list.add(new Option(i,i)));
      $(targetJobRole).innerHTML = '<option value="">Select</option>';
    });
  });

  // JobType -> JobRole
  ['currentJobType','jobType'].forEach(id => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('change', e => {
      const targetJobRole = id === 'currentJobType' ? 'currentJobRole' : 'jobRole';
      const list = $(targetJobRole); list.innerHTML = '<option value="">Select</option>';
      (jobRoleMap[e.target.value]||[]).forEach(i => list.add(new Option(i,i)));
    });
  });

  // Lookup button (doGet)
  $('lookupBtn').addEventListener('click', async () => {
    const pid = $('lookupParticipantId').value.trim();
    const phone = $('lookupTelephone').value.trim();
    $('lookupStatus').textContent = 'Searching...';
    try {
      let url = APPS_SCRIPT_URL;
      if (pid) url += '?participantId=' + encodeURIComponent(pid);
      else if (phone) url += '?phone=' + encodeURIComponent(phone);
      else { $('lookupStatus').textContent = 'Enter ParticipantID or Telephone.'; return; }
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 'NOT_FOUND') {
        $('lookupStatus').textContent = 'No participant found.';
        return;
      }
      if (data.status === 'MULTIPLE') {
        $('lookupStatus').textContent = 'Multiple matches found. Use exact ParticipantID.';
        return;
      }
      if (data.status === 'OK' && data.record) {
        prefillFormFromRecord(data.record);
        $('lookupStatus').textContent = 'Participant loaded. You can submit training/placement.';
      } else {
        $('lookupStatus').textContent = 'Lookup error: ' + (data.message || JSON.stringify(data));
      }
    } catch (err) {
      $('lookupStatus').textContent = 'Network error: ' + err.message;
    }
  });

  // Form submit
  $('questionnaire').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const payload = collectFormData();
    if (!payload) return;
    $('submitBtn').disabled = true;
    $('status').textContent = 'Submitting...';
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.status === 'OK') {
        $('status').textContent = 'Saved. ParticipantID: ' + (data.participantId || payload.participantId) + ' Reference: ' + (data.referenceId || '');
        $('questionnaire').reset();
        // remove hidden participantId if present
        const ph = document.getElementById('participantIdHidden');
        if (ph) ph.remove();
      } else {
        $('status').textContent = 'Error: ' + (data.message || 'Unknown error');
      }
    } catch (err) {
      $('status').textContent = 'Network error: ' + err.message;
    } finally {
      $('submitBtn').disabled = false;
    }
  });
});

/* ========== Helper functions ========== */

// Populate districts for a region into a target select
function populateDistricts(regionId, targetId){
  const list = document.getElementById(targetId);
  if (!list) return;
  list.innerHTML = '<option value="">Select</option>';
  const arr = REFERENCE.districtsByRegion[regionId] || [];
  arr.forEach(d => list.add(new Option(d,d)));
}

// Prefill form from a General record (makes demographic fields readonly)
function prefillFormFromRecord(rec){
  // store participantId in a hidden field
  if (rec.ParticipantID) {
    let pidField = document.getElementById('participantIdHidden');
    if (!pidField) {
      pidField = document.createElement('input');
      pidField.type = 'hidden';
      pidField.id = 'participantIdHidden';
      pidField.name = 'participantId';
      document.getElementById('questionnaire').appendChild(pidField);
    }
    pidField.value = rec.ParticipantID;
  }

  // Map and set fields (case-sensitive keys from sheet headers)
  const map = {
    'implementingPartner':'ImplementingPartner','region':'Region','district':'District','community':'Community',
    'surname':'Surname','firstName':'FirstName','otherNames':'OtherNames','sex':'Sex','dob':'DOB','telephone':'Telephone',
    'ghanaCardId':'GhanaCardID','voterId':'VoterID','hamisId':'HAMISID'
  };
  Object.keys(map).forEach(k => {
    const el = document.getElementById(k);
    const headerKey = map[k];
    if (el && rec[headerKey] !== undefined && rec[headerKey] !== '') {
      el.value = rec[headerKey];
      el.readOnly = true;
    }
  });

  // Age and derived fields
  if (rec.DOB) {
    const age = calculateAgeFromDOB(rec.DOB);
    if ($('age')) $('age').value = age;
    if ($('participantTypeAge')) $('participantTypeAge').value = deriveAgeGroup(age);
    const bucket = deriveYouthBucket(age);
    if (bucket) { $('youthBucket').value = bucket; show($('youthBucketWrap')); } else hide($('youthBucketWrap'));
  }

  // Show baseline employment block if EmploymentStatus indicates employed
  if (rec.EmploymentStatus && String(rec.EmploymentStatus).toLowerCase() === 'employed') show($('baselineEmploymentBlock'));
}

// Collect form data into an object and run client-side validations
function collectFormData(){
  const form = document.getElementById('questionnaire');
  if (!form.checkValidity()) { form.reportValidity(); return null; }
  const fd = new FormData(form);
  const obj = {};
  fd.forEach((v,k) => {
    if (k === 'modules') {
      if (!obj.modules) obj.modules = [];
      obj.modules.push(v);
    } else {
      obj[k] = v;
    }
  });

  // include hidden participantId if present
  const pidHidden = document.getElementById('participantIdHidden');
  if (pidHidden) obj.participantId = pidHidden.value;

  // Derived fields from DOB
  if (obj.dob) {
    const age = calculateAgeFromDOB(obj.dob);
    obj.age = age;
    obj.participantTypeAge = deriveAgeGroup(age);
    obj.youthBucket = deriveYouthBucket(age);
  }

  // Client-side validations
  if (!validatePhone(obj.telephone)) { alert('Telephone invalid: must be 10 digits starting with 0.'); return null; }
  if (obj.idType === 'Ghana Card') {
    if (!validateGhanaCard(obj.ghanaCardId)) { alert('Ghana Card invalid: must contain 10 digits.'); return null; }
    obj.ghanaCardId = formatGhanaCardInput(obj.ghanaCardId);
  }
  if (obj.voterId && !validateVoterId(obj.voterId)) { alert('Voter ID invalid: must be 10 characters.'); return null; }

  obj.submittedAt = new Date().toISOString();
  return obj;
}
