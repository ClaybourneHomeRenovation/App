const materialCatalog = {
  "Lumber / framing": 5.25,
  "Drywall sheet": 18,
  "Primer / paint": 48,
  "Flooring": 4.75,
  "Tile": 7.5,
  "Trim / casing": 2.85,
  "Cabinet hardware": 8.5,
  "Plumbing fixture": 185,
  "Electrical fixture": 95,
  "Fasteners / adhesive": 22,
  "Custom material": 0
};

const materialCategoryOptions = [
  "Tile",
  "Waterproofing",
  "Drywall",
  "Flooring",
  "Paint",
  "Plumbing",
  "Electrical",
  "Fasteners",
  "Adhesives / Sealants",
  "Lumber / Framing",
  "Concrete / Masonry",
  "Decking / Outdoor",
  "Hardware",
  "Tools / Equipment",
  "Doors / Windows",
  "Trim / Millwork",
  "Cabinets / Countertops",
  "Insulation",
  "Roofing / Exterior",
  "HVAC / Ventilation",
  "Safety / Protection",
  "Cleaning / Consumables",
  "Disposal",
  "Custom"
];

const manualMaterialsKey = "claybourneManualMaterials";

const starterSupplierMaterials = [
  { id: "porcelain-tile", name: "Porcelain floor/wall tile allowance", category: "Tile", supplier: "Home Depot", unitPrice: 7.5, unit: "sq ft", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=porcelain%20tile", keywords: ["tile", "bathroom", "shower", "floor", "backsplash"], quoteMaterial: "Tile" },
  { id: "thinset", name: "Polymer-modified thinset mortar", category: "Tile", supplier: "Home Depot", unitPrice: 32, unit: "bag", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=modified%20thinset", keywords: ["tile", "mortar", "thinset", "shower"], quoteMaterial: "Fasteners / adhesive" },
  { id: "grout", name: "Premium grout allowance", category: "Tile", supplier: "Home Depot", unitPrice: 28, unit: "bag", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=grout", keywords: ["tile", "grout", "bathroom", "backsplash"], quoteMaterial: "Fasteners / adhesive" },
  { id: "waterproofing-membrane", name: "Waterproofing membrane / roll-on allowance", category: "Waterproofing", supplier: "Home Depot", unitPrice: 95, unit: "pail/roll", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=waterproofing%20membrane", keywords: ["waterproofing", "shower", "bathroom", "tile"], quoteMaterial: "Custom material" },
  { id: "cement-board", name: "Tile backer / cement board", category: "Waterproofing", supplier: "Home Depot", unitPrice: 24, unit: "sheet", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=cement%20board", keywords: ["backer", "cement", "tile", "bathroom", "shower"], quoteMaterial: "Drywall sheet" },
  { id: "drywall", name: "Drywall sheet", category: "Drywall", supplier: "Home Depot", unitPrice: 18, unit: "sheet", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=drywall%20sheet", keywords: ["drywall", "basement", "repair", "wall"], quoteMaterial: "Drywall sheet" },
  { id: "flooring-vinyl", name: "Vinyl plank flooring allowance", category: "Flooring", supplier: "Home Depot", unitPrice: 4.75, unit: "sq ft", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=vinyl%20plank%20flooring", keywords: ["flooring", "basement", "kitchen", "floor"], quoteMaterial: "Flooring" },
  { id: "paint", name: "Interior primer / paint allowance", category: "Paint", supplier: "Home Depot", unitPrice: 48, unit: "can", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=interior%20paint", keywords: ["paint", "primer", "finish", "drywall"], quoteMaterial: "Primer / paint" },
  { id: "vanity", name: "Bathroom vanity allowance", category: "Plumbing", supplier: "Home Depot", unitPrice: 450, unit: "each", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=bathroom%20vanity", keywords: ["vanity", "bathroom", "fixture"], quoteMaterial: "Plumbing fixture" },
  { id: "toilet", name: "Toilet fixture allowance", category: "Plumbing", supplier: "Home Depot", unitPrice: 185, unit: "each", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=toilet", keywords: ["toilet", "bathroom", "fixture", "plumbing"], quoteMaterial: "Plumbing fixture" },
  { id: "bath-fan", name: "Bathroom fan / electrical fixture allowance", category: "Electrical", supplier: "Home Depot", unitPrice: 95, unit: "each", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=bathroom%20fan", keywords: ["fan", "electrical", "bathroom", "light"], quoteMaterial: "Electrical fixture" },
  { id: "fasteners", name: "Fasteners, adhesive, blades and consumables", category: "Fasteners", supplier: "Home Depot", unitPrice: 22, unit: "allowance", lastChecked: "Manual estimate", url: "https://www.homedepot.ca/search?q=construction%20adhesive%20fasteners", keywords: ["fasteners", "adhesive", "cleanup", "install"], quoteMaterial: "Fasteners / adhesive" },
  { id: "bin", name: "Disposal / bin allowance", category: "Disposal", supplier: "Local supplier", unitPrice: 300, unit: "allowance", lastChecked: "Manual estimate", url: "", keywords: ["disposal", "demo", "demolition", "cleanup", "bin"], quoteMaterial: "Custom material" }
];

const staticSupplierMaterials = [
  ...(window.supplierLiveMaterials || []),
  ...starterSupplierMaterials
];

const supplierMaterials = [
  ...manualSupplierMaterials(),
  ...staticSupplierMaterials
];

function setMaterialSyncStatus(message, tone = "neutral") {
  const status = document.getElementById("materialSyncStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function setArchiveSyncStatus(message, tone = "neutral") {
  const status = document.getElementById("archiveSyncStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function setAuthStatus(message, isError = false, targetId = "authStatus") {
  const status = document.getElementById(targetId);
  if (!status) return;
  status.textContent = message || "";
  status.classList.toggle("is-error", Boolean(isError));
}

function showCreateAccountScreen() {
  document.getElementById("authForm")?.classList.add("is-hidden");
  document.getElementById("createAccountForm")?.classList.remove("is-hidden");
  setAuthStatus("");
  setAuthStatus("", false, "createAuthStatus");
  const email = document.getElementById("authEmail")?.value.trim();
  const createEmail = document.getElementById("createEmail");
  if (email && createEmail) createEmail.value = email;
}

function showSignInScreen() {
  document.getElementById("createAccountForm")?.classList.add("is-hidden");
  document.getElementById("authForm")?.classList.remove("is-hidden");
  setAuthStatus("");
  setAuthStatus("", false, "createAuthStatus");
}

function isSignedInSession(session) {
  return Boolean(session?.user?.email && !session.user?.is_anonymous);
}

function updateAuthUI(session) {
  authSession = isSignedInSession(session) ? session : null;
  document.getElementById("authScreen")?.classList.toggle("is-hidden", Boolean(authSession));
  document.getElementById("appShell")?.classList.toggle("is-hidden", !authSession);
  const account = document.getElementById("accountStatus");
  if (account) account.textContent = authSession?.user?.email ? `Signed in: ${authSession.user.email}` : "Not signed in";
}

function supabaseMaterialToLocal(row) {
  return {
    id: row.id,
    name: row.product_name,
    supplier: row.supplier,
    sku: row.sku_model || "",
    unit: row.unit || "each",
    unitPrice: numberValue(row.last_known_price),
    url: row.product_url || "",
    lastChecked: row.last_checked_date || "",
    category: row.category || "Custom",
    image: row.image_url || "",
    keywords: row.keywords || [],
    quoteMaterial: row.quote_material || quoteMaterialForCategory(row.category || "Custom"),
    manual: true,
    cloudSynced: true
  };
}

async function resolveMaterialImageUrl(imageValue) {
  const bridge = window.ClaybourneSupabase;
  if (!imageValue?.startsWith("storage:material-images:") || !bridge?.isAvailable()) return imageValue || "";
  const storagePath = imageValue.replace("storage:material-images:", "");
  try {
    const { data, error } = await bridge.client.storage
      .from("material-images")
      .createSignedUrl(storagePath, 60 * 60 * 24);
    if (error) throw error;
    return data?.signedUrl || "";
  } catch (error) {
    console.warn("Material image signed URL skipped:", error.message || error);
    return "";
  }
}

async function hydrateMaterialImage(item) {
  const storageImage = item.storageImage || item.image || "";
  return {
    ...item,
    storageImage,
    image: await resolveMaterialImageUrl(storageImage)
  };
}

function localMaterialToSupabase(item) {
  return {
    id: item.id,
    product_name: item.name,
    supplier: item.supplier,
    sku_model: item.sku || "",
    unit: item.unit || "each",
    last_known_price: numberValue(item.unitPrice),
    product_url: item.url || "",
    last_checked_date: item.lastChecked || todayISO(),
    category: item.category || "Custom",
    image_url: item.storageImage || item.image || "",
    keywords: item.keywords || [],
    quote_material: item.quoteMaterial || quoteMaterialForCategory(item.category || "Custom")
  };
}

function supplierCatalogToSupabase(item) {
  return {
    id: item.id,
    product_name: item.name,
    category: item.category || "Custom",
    supplier: item.supplier || "Unknown supplier",
    sku_model: item.sku || item.model || "",
    unit_price: numberValue(item.unitPrice),
    unit: item.unit || "each",
    product_url: item.url || "",
    image_url: item.image || "",
    keywords: item.keywords || [],
    quote_material: item.quoteMaterial || quoteMaterialForCategory(item.category || "Custom"),
    source: item.source || "Built-in fallback catalog"
  };
}

function supabaseCatalogToLocal(row) {
  return {
    id: row.id,
    name: row.product_name,
    category: row.category || "Custom",
    supplier: row.supplier || "Unknown supplier",
    sku: row.sku_model || "",
    model: row.sku_model || "",
    unitPrice: numberValue(row.unit_price),
    unit: row.unit || "each",
    url: row.product_url || "",
    image: row.image_url || "",
    keywords: row.keywords || [],
    quoteMaterial: row.quote_material || quoteMaterialForCategory(row.category || "Custom"),
    source: row.source || "Supabase supplier catalog",
    cloudSynced: true
  };
}

function mergeSupplierMaterials(items) {
  items.forEach(item => {
    const existingIndex = supplierMaterials.findIndex(material => material.id === item.id);
    if (existingIndex >= 0) supplierMaterials.splice(existingIndex, 1, item);
    else supplierMaterials.unshift(item);
  });
}

async function syncSupplierCatalogFromSupabase() {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) return;
  setMaterialSyncStatus("Checking Supabase supplier catalog...", "neutral");
  try {
    await bridge.ensureSession();
    const { data: existing, error: existingError } = await bridge.client
      .from("supplier_catalog")
      .select("id")
      .limit(1);
    if (existingError) throw existingError;
    if (!existing?.length && staticSupplierMaterials.length) {
      setMaterialSyncStatus("Uploading imported supplier catalog...", "neutral");
      const { error: seedError } = await bridge.client
        .from("supplier_catalog")
        .upsert(staticSupplierMaterials.map(supplierCatalogToSupabase), { onConflict: "id" });
      if (seedError) throw seedError;
    }
    const { data, error } = await bridge.client
      .from("supplier_catalog")
      .select("*")
      .order("product_name", { ascending: true });
    if (error) throw error;
    const cloudCatalog = (data || []).map(supabaseCatalogToLocal);
    if (cloudCatalog.length) {
      cloudSupplierCatalogCount = cloudCatalog.length;
      mergeSupplierMaterials(cloudCatalog);
      renderMaterialCatalog();
      setMaterialSyncStatus(`Supplier catalog synced: ${cloudCatalog.length} materials`, "success");
    }
  } catch (error) {
    setMaterialSyncStatus(`Supplier catalog sync failed: ${error.message || "fallback active"}`, "error");
    console.warn("Supabase supplier catalog sync skipped:", error.message || error);
  }
}

async function uploadLocalManualMaterial(item) {
  const bridge = window.ClaybourneSupabase;
  const firstTry = localMaterialToSupabase(item);
  const { error } = await bridge.client
    .from("manual_materials")
    .upsert(firstTry, { onConflict: "id" });
  if (!error) return { ...item, cloudSynced: true };

  const clonedItem = {
    ...item,
    id: `manual-${authSession?.user?.id || "user"}-${Date.now()}-${safeStorageFileName(item.id)}`
  };
  const { error: cloneError } = await bridge.client
    .from("manual_materials")
    .insert(localMaterialToSupabase(clonedItem));
  if (cloneError) throw cloneError;
  return { ...clonedItem, cloudSynced: true };
}

async function syncManualMaterialsFromSupabase() {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) {
    setMaterialSyncStatus("Local material backup only", "warning");
    return;
  }
  setMaterialSyncStatus("Checking Supabase...", "neutral");
  try {
    await bridge.ensureSession();
    const { data, error } = await bridge.client
      .from("manual_materials")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    const cloudMaterials = await Promise.all((data || []).map(row => hydrateMaterialImage(supabaseMaterialToLocal(row))));
    const localManual = manualSupplierMaterials();
    const localOnly = localManual.filter(item => !cloudMaterials.some(cloud => cloud.id === item.id));
    const uploadedLocal = [];
    if (localOnly.length) {
      for (const item of localOnly) {
        try {
          uploadedLocal.push(await uploadLocalManualMaterial(item));
        } catch (uploadError) {
          console.warn("Local manual material upload skipped:", uploadError.message || uploadError);
        }
      }
    }
    if (!cloudMaterials.length && !uploadedLocal.length) {
      setMaterialSyncStatus(
        cloudSupplierCatalogCount
          ? `Supabase synced: ${cloudSupplierCatalogCount} catalog materials. No manual materials yet.`
          : "Supabase connected. No cloud materials yet.",
        "success"
      );
      return;
    }
    const syncedLocalMaterials = await Promise.all(uploadedLocal.map(item => hydrateMaterialImage(item)));
    const syncedMaterials = [...cloudMaterials, ...syncedLocalMaterials];
    mergeSupplierMaterials(syncedMaterials);
    saveManualSupplierMaterials(syncedMaterials);
    renderMaterialCatalog();
    setMaterialSyncStatus(
      cloudSupplierCatalogCount
        ? `Supabase synced: ${cloudSupplierCatalogCount} catalog + ${syncedMaterials.length} manual`
        : `Supabase synced: ${syncedMaterials.length} saved material${syncedMaterials.length === 1 ? "" : "s"}`,
      "success"
    );
  } catch (error) {
    setMaterialSyncStatus(`Material sync failed: ${error.message || "local backup active"}`, "error");
    console.warn("Supabase material sync skipped:", error.message || error);
  }
}

async function syncMaterialsFromSupabase() {
  await syncSupplierCatalogFromSupabase();
  await syncManualMaterialsFromSupabase();
}

async function saveManualMaterialToSupabase(item) {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) {
    setMaterialSyncStatus("Saved locally. Supabase unavailable.", "warning");
    return;
  }
  setMaterialSyncStatus("Saving material to Supabase...", "neutral");
  try {
    await bridge.ensureSession();
    const { error } = await bridge.client
      .from("manual_materials")
      .upsert(localMaterialToSupabase(item), { onConflict: "id" });
    if (error) throw error;
    setMaterialSyncStatus("Material saved to Supabase", "success");
  } catch (error) {
    setMaterialSyncStatus("Saved locally. Supabase save failed.", "error");
    console.warn("Supabase material save skipped:", error.message || error);
  }
}

function safeStorageFileName(name) {
  return (name || "material-image")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96) || "material-image";
}

async function uploadMaterialImageToSupabase(file, materialId) {
  const bridge = window.ClaybourneSupabase;
  if (!file || !bridge?.isAvailable()) return "";
  try {
    const session = await bridge.ensureSession();
    const userId = session?.user?.id;
    if (!userId) throw new Error("No Supabase user session");
    setMaterialSyncStatus("Uploading material image...", "neutral");
    const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const fileName = `${materialId}-${Date.now()}-${safeStorageFileName(file.name || `image.${extension}`)}`;
    const storagePath = `${userId}/${fileName}`;
    const { error } = await bridge.client.storage
      .from("material-images")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: true
      });
    if (error) throw error;
    return `storage:material-images:${storagePath}`;
  } catch (error) {
    setMaterialSyncStatus("Image stayed local. Supabase upload failed.", "error");
    console.warn("Supabase material image upload skipped:", error.message || error);
    return "";
  }
}

function archiveRecordToSupabase(record) {
  return {
    id: record.id,
    quote_number: record.quoteNumber || "",
    client_name: record.clientName || "Unnamed Client",
    project_type: record.projectType || "Project Quote",
    project_address: record.projectAddress || "",
    quote_date: record.quoteDate || todayISO(),
    total_quote: numberValue(record.totalQuote),
    status: record.status || "Draft",
    saved_at: record.savedAt || new Date().toISOString(),
    snapshot: record.snapshot || {}
  };
}

function supabaseArchiveToLocal(row) {
  return {
    id: row.id,
    quoteNumber: row.quote_number || "",
    clientName: row.client_name || "Unnamed Client",
    projectType: row.project_type || "Project Quote",
    projectAddress: row.project_address || "",
    quoteDate: row.quote_date || "",
    totalQuote: numberValue(row.total_quote),
    status: row.status || "Draft",
    savedAt: row.saved_at || row.updated_at || new Date().toISOString(),
    snapshot: row.snapshot || {},
    cloudSynced: true
  };
}

function archiveDedupKey(entry) {
  return [
    entry.quoteNumber || "",
    (entry.clientName || "").trim().toLowerCase(),
    entry.quoteDate || "",
    Math.round(numberValue(entry.totalQuote) * 100)
  ].join("|");
}

function dedupeArchiveEntries(entries) {
  const byKey = new Map();
  entries.forEach(entry => {
    if (!entry?.id) return;
    const key = archiveDedupKey(entry);
    const current = byKey.get(key);
    if (!current || new Date(entry.savedAt || 0) > new Date(current.savedAt || 0)) {
      byKey.set(key, entry);
    }
  });
  return [...byKey.values()].sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0));
}

async function uploadLocalArchiveEntry(entry) {
  const bridge = window.ClaybourneSupabase;
  const { error } = await bridge.client
    .from("quote_archives")
    .upsert(archiveRecordToSupabase(entry), { onConflict: "id" });
  if (!error) return { ...entry, cloudSynced: true };
  throw error;
}

function activeQuoteRecord(session = authSession) {
  const t = totals();
  return {
    user_id: session?.user?.id,
    id: "current",
    quote_number: state.settings.quoteNumber || "",
    client_name: state.project.clientName || "",
    project_type: state.project.projectType || "Project Quote",
    project_address: state.project.projectAddress || "",
    total_quote: numberValue(t.totalQuote),
    saved_at: new Date().toISOString(),
    snapshot: stateSnapshot()
  };
}

async function saveActiveQuoteToSupabase() {
  const bridge = window.ClaybourneSupabase;
  if (!authSession || !bridge?.isAvailable()) return;
  try {
    const payload = activeQuoteRecord(authSession);
    const { error } = await bridge.client
      .from("active_quotes")
      .upsert(payload, { onConflict: "user_id,id" });
    if (error) throw error;
  } catch (error) {
    console.warn("Supabase active quote save skipped:", error.message || error);
  }
}

function scheduleActiveQuoteSync() {
  if (!authSession || activeQuoteLoadedFromCloud) return;
  window.clearTimeout(activeQuoteSyncTimer);
  activeQuoteSyncTimer = window.setTimeout(saveActiveQuoteToSupabase, 1100);
}

async function syncActiveQuoteFromSupabase() {
  const bridge = window.ClaybourneSupabase;
  if (!authSession || !bridge?.isAvailable()) return;
  try {
    const localQuoteExists = Boolean(localStorage.getItem("claybourneQuoteBuilder"));
    const { data, error } = await bridge.client
      .from("active_quotes")
      .select("*")
      .eq("id", "current")
      .maybeSingle();
    if (error) throw error;
    if (data?.snapshot && !localQuoteExists) {
      activeQuoteLoadedFromCloud = true;
      Object.assign(state, JSON.parse(JSON.stringify(data.snapshot)));
      ensureStateShape();
      saveState();
      activeQuoteLoadedFromCloud = false;
      render();
      return;
    }
    await saveActiveQuoteToSupabase();
  } catch (error) {
    console.warn("Supabase active quote sync skipped:", error.message || error);
  }
}

async function saveArchiveRecordToSupabase(record) {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) {
    setArchiveSyncStatus("Saved locally. Supabase unavailable.", "warning");
    return;
  }
  setArchiveSyncStatus("Saving quote to Supabase...", "neutral");
  try {
    await bridge.ensureSession();
    const { error } = await bridge.client
      .from("quote_archives")
      .upsert(archiveRecordToSupabase(record), { onConflict: "id" });
    if (error) throw error;
    setArchiveSyncStatus("Quote archive synced", "success");
  } catch (error) {
    setArchiveSyncStatus("Saved locally. Quote cloud sync failed.", "error");
    console.warn("Supabase archive save skipped:", error.message || error);
  }
}

async function deleteArchiveRecordFromSupabase(id) {
  const bridge = window.ClaybourneSupabase;
  if (!id || !bridge?.isAvailable()) return;
  try {
    await bridge.ensureSession();
    const { error } = await bridge.client.from("quote_archives").delete().eq("id", id);
    if (error) throw error;
    setArchiveSyncStatus("Quote deleted from Supabase", "success");
  } catch (error) {
    setArchiveSyncStatus("Local delete done. Cloud delete failed.", "error");
    console.warn("Supabase archive delete skipped:", error.message || error);
  }
}

async function syncArchiveFromSupabase() {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) {
    setArchiveSyncStatus("Local archive backup active", "warning");
    return;
  }
  setArchiveSyncStatus("Checking Supabase archive...", "neutral");
  try {
    await bridge.ensureSession();
    const { data, error } = await bridge.client
      .from("quote_archives")
      .select("*")
      .order("saved_at", { ascending: false });
    if (error) throw error;
    const cloudEntries = (data || []).map(supabaseArchiveToLocal);
    const localEntries = archiveEntries();
    const cloudKeys = new Set(cloudEntries.map(archiveDedupKey));
    const localOnly = localEntries.filter(entry => !cloudEntries.some(cloud => cloud.id === entry.id) && !cloudKeys.has(archiveDedupKey(entry)));
    const uploadedLocal = [];
    if (localOnly.length) {
      for (const entry of localOnly) {
        try {
          uploadedLocal.push(await uploadLocalArchiveEntry(entry));
        } catch (uploadError) {
          console.warn("Local archive upload skipped:", uploadError.message || uploadError);
        }
      }
    }
    const mergedEntries = dedupeArchiveEntries([...cloudEntries, ...uploadedLocal]);
    saveArchiveEntries(mergedEntries);
    renderArchive();
    setArchiveSyncStatus(
      mergedEntries.length
        ? `Supabase synced: ${mergedEntries.length} saved quote${mergedEntries.length === 1 ? "" : "s"}`
        : "Supabase connected. No saved quotes yet.",
      "success"
    );
  } catch (error) {
    setArchiveSyncStatus(`Archive sync failed: ${error.message || "local backup active"}`, "error");
    console.warn("Supabase archive sync skipped:", error.message || error);
  }
}

const qualityMultipliers = {
  Standard: 1,
  Premium: 1.25,
  Luxury: 1.55
};

const presets = {
  premium: {
    pricingMethod: "quick",
    hourlyRate: 90,
    minimumJob: 750,
    overheadRate: 20,
    profitRate: 22,
    taxRate: 13,
    wasteRate: 10,
    materialMarkupRate: 18,
    subMarkupRate: 12,
    contingencyRate: 12,
    standardSavingsRate: 5,
    dannyPayRate: 35,
    julianPayRate: 35,
    preparedBy: "Claybourne Home Renovation"
  },
  handyman: {
    pricingMethod: "quick",
    hourlyRate: 75,
    minimumJob: 425,
    overheadRate: 15,
    profitRate: 18,
    taxRate: 13,
    wasteRate: 8,
    materialMarkupRate: 12,
    subMarkupRate: 8,
    contingencyRate: 7,
    standardSavingsRate: 5,
    dannyPayRate: 35,
    julianPayRate: 35,
    preparedBy: "Claybourne Home Renovation"
  }
};

const siteConditionOptions = [
  "Water damage",
  "Mold risk",
  "Rotten framing",
  "Uneven floors/walls",
  "Electrical issues",
  "Plumbing issues",
  "Poor previous renovations",
  "Hidden damage possible",
  "Access or stair restrictions",
  "Parking/delivery restrictions",
  "Condo/elevator rules",
  "Limited working hours"
];

const jobTypeTemplates = {
  "Bathroom Remodel": {
    timeline: "2-3 weeks, subject to material availability, curing time, concealed conditions, and trade scheduling.",
    includedWork: "Demolition of agreed existing finishes, waterproofing where specified, tile/flooring installation, vanity/toilet/fixture installation, trim, paint touch-ups, disposal, and final cleanup.",
    excludedWork: "Hidden water damage, mold remediation, structural repairs, code deficiencies, major plumbing/electrical relocation, glass shower doors, permits, drawings, and client-requested upgrades unless specifically listed.",
    finishLevel: "Premium bathroom finish with clean tile layout, proper waterproofing, neat trim transitions, and manufacturer-approved installation methods.",
    contingencyRate: 15,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due by progress milestones and upon substantial completion."
  },
  "Kitchen Remodel": {
    timeline: "3-6 weeks, subject to cabinet delivery, countertop templating, material availability, and trade scheduling.",
    includedWork: "Demolition of agreed existing finishes, cabinet/fixture installation coordination, backsplash/flooring/trim work where specified, disposal, protection, and final cleanup.",
    excludedWork: "Cabinet manufacturing delays, countertop supplier delays, appliance defects, structural changes, major plumbing/electrical relocation, permits, engineering, and layout changes unless specifically listed.",
    finishLevel: "Premium kitchen finish with careful alignment, clean transitions, and coordinated installation around cabinets, counters, appliances, and fixtures.",
    contingencyRate: 15,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due by demolition/rough-in, cabinet/tile/countertop progress, and substantial completion milestones."
  },
  "Basement Remodel": {
    timeline: "4-8 weeks, subject to permits, inspections, moisture conditions, trade scheduling, and material availability.",
    includedWork: "Framing, insulation, drywall, flooring, trim, paint, electrical/plumbing coordination where specified, protection, disposal, and final cleanup.",
    excludedWork: "Moisture remediation, foundation repairs, egress changes, engineering, fire-code upgrades, HVAC redesign, permit fees, inspection changes, and concealed code deficiencies unless specifically listed.",
    finishLevel: "Durable premium basement finish suitable for lower-level moisture and access conditions.",
    contingencyRate: 20,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due by framing/rough-in, drywall/flooring, and substantial completion milestones."
  },
  "Handyman Job": {
    timeline: "Usually 1 day or less, subject to parts availability, access, parking, and task complexity.",
    includedWork: "Listed small repairs or installations, basic setup, ordinary cleanup, and standard small consumables.",
    excludedWork: "Hidden defects, missing parts, client-supplied product defects, major repairs, permit work, and tasks not listed in the approved scope.",
    finishLevel: "Clean professional repair standard appropriate to the existing condition of the home.",
    contingencyRate: 7,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due upon completion."
  },
  "Custom Job": {
    timeline: "Timeline to be confirmed after design, material selection, measurement, and final scope approval.",
    includedWork: "Custom planning, measurements, agreed fabrication or installation work, protection, cleanup, and coordination listed in this quote.",
    excludedWork: "Design revisions, specialty material delays, engineering, permit fees, hidden conditions, and work not listed in the approved scope.",
    finishLevel: "Custom premium finish based on approved drawings, measurements, samples, and final selections.",
    contingencyRate: 18,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due at approved production/progress milestones and upon substantial completion."
  },
  "General Renovation": {
    timeline: "Timeline subject to material availability, site conditions, change orders, client decisions, and trade scheduling.",
    includedWork: "Agreed renovation tasks, ordinary setup, protection, installation, disposal where specified, cleanup, and listed finish work.",
    excludedWork: "Hidden damage, code deficiencies, structural repairs, permits, engineering, client upgrades, and work not included in the approved scope.",
    finishLevel: "Premium residential renovation finish with careful installation and clean completion details.",
    contingencyRate: 12,
    paymentSchedule: "Initial deposit equals the full material cost and is due upfront before materials are ordered. Remaining balance is due at midway/progress stage and upon substantial completion."
  }
};

const defaultTerms = {
  changeOrderTerms: "Any work outside the approved scope will be quoted and approved in writing before proceeding. Changes caused by concealed conditions, client selections, trade requirements, code issues, or material substitutions may affect price and timeline.",
  warrantyTerms: `Claybourne Home Renovation provides a 1-Year Limited Workmanship Warranty on eligible completed renovation work.

This workmanship warranty covers labour and installation issues caused by Claybourne Home Renovation, including installation defects, workmanship errors, improper fastening, trim separation, grout cracking caused by improper installation, leaks caused by installation error, cabinet alignment issues, and paint peeling caused by preparation failure.

This warranty does not cover manufacturer defects, normal wear and tear, customer damage, movement or shifting of the home, moisture or pre-existing issues, plumbing or electrical systems not installed by Claybourne Home Renovation, abuse, or improper maintenance.

Important distinction: Claybourne Home Renovation's warranty covers labour and workmanship. Manufacturer warranties cover materials and products. For example, flooring that fails because of a defective locking system is a manufacturer issue. Flooring that separates because of improper installation is a workmanship issue.`,
  clientMaterialTerms: "Client-supplied materials are not covered under contractor product warranty. Additional labour caused by missing, incorrect, delayed, damaged, or defective client-supplied materials may be billed separately."
};

const state = {
  settings: {},
  project: {},
  lines: [],
  costs: {},
  subs: [],
  payments: [],
  expenses: [],
  tasks: [],
  jobMaterials: [],
  siteLogs: [],
  communications: [],
  photos: [],
  closeout: [],
  changeOrders: [],
  meta: {}
};

const settingIds = ["pricingMethod", "hourlyRate", "minimumJob", "overheadRate", "profitRate", "taxRate", "wasteRate", "materialMarkupRate", "subMarkupRate", "contingencyRate", "standardSavingsRate", "dannyPayRate", "julianPayRate", "depositPaid", "quoteNumber", "quoteDate", "validUntil", "preparedBy"];
const projectIds = ["clientName", "clientPhone", "projectAddress", "clientEmail", "projectType", "jobStatus", "materialSupply", "timeline", "specialConditions", "scopeOfWork", "roomsAreas", "finishLevel", "includedWork", "excludedWork", "siteNotes", "paymentSchedule", "changeOrderTerms", "warrantyTerms", "clientMaterialTerms"];
const costIds = ["prepHours", "travelHours", "pickupHours", "cleanupHours", "adminHours", "helperCost", "permitCost", "disposalCost", "protectionCost", "miscCost", "quickWorkers", "quickDays", "quickHoursPerDay", "quickMaterialCost", "quickOtherCost"];
const quickIds = ["quickWorkers", "quickDays", "quickHoursPerDay", "quickMaterialCost", "quickOtherCost", "quickRiskLevel"];
const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
const archiveKey = "claybourneQuoteArchive";
let activeStep = "start";
let saveStatusTimer;
let quoteSuccessText = "";
const quoteSteps = ["start", "scope", "pricing", "review"];
let activeAccountingTab = "summary";
let openLineIndex = null;
let materialScreenshotFile = null;
let editingMaterialId = null;
let manualMaterialImageDataUrl = "";
let manualMaterialImageFile = null;
let manualMaterialStorageImageRef = "";
let cloudSupplierCatalogCount = 0;
let authSession = null;
let activeQuoteSyncTimer = null;
let activeQuoteLoadedFromCloud = false;
const dashboardDrafts = {
  task: null,
  material: null,
  siteLog: null,
  communication: null
};
const accountingDrafts = {
  payment: null,
  expense: null
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function futureISO(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function quoteDateStamp(date = new Date()) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function quoteNumber(sequence = currentQuoteSequence(), date = new Date()) {
  return `CLY-${quoteDateStamp(date)}-${String(sequence).padStart(2, "0")}`;
}

function currentQuoteSequence() {
  return numberValue(localStorage.getItem(`claybourneQuoteSequence-${quoteDateStamp()}`)) || 1;
}

function sequenceForDate(dateValue) {
  return numberValue(localStorage.getItem(`claybourneQuoteSequence-${quoteDateStamp(new Date(dateValue || todayISO()))}`)) || 1;
}

function markQuoteIssued() {
  if (state.meta.finalized && !state.meta.dirty) return;
  if (state.meta.finalized && state.meta.dirty) {
    state.meta.dirty = false;
    saveState();
    return;
  }
  const stamp = quoteDateStamp(new Date(state.settings.quoteDate || todayISO()));
  const sequence = numberValue(String(state.settings.quoteNumber || "").split("-").pop()) || currentQuoteSequence();
  const stored = numberValue(localStorage.getItem(`claybourneQuoteSequence-${stamp}`)) || 1;
  localStorage.setItem(`claybourneQuoteSequence-${stamp}`, String(Math.max(stored, sequence + 1)));
  state.meta.finalized = true;
  saveState();
}

function money(value) {
  return currency.format(Number(value || 0));
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function defaultLine(overrides = {}) {
  return {
    area: "",
    description: "",
    material: "Custom material",
    quality: "Premium",
    qty: 1,
    marketRate: 0,
    hours: 0,
    other: 0,
    savings: null,
    ...overrides
  };
}

function defaultSub(overrides = {}) {
  return {
    trade: "",
    scope: "",
    cost: 0,
    ...overrides
  };
}

function defaultPayment(overrides = {}) {
  return {
    date: todayISO(),
    type: "Deposit",
    method: "E-transfer",
    amount: 0,
    note: "",
    ...overrides
  };
}

function defaultExpense(overrides = {}) {
  return {
    date: todayISO(),
    category: "Materials",
    vendor: "",
    amount: 0,
    note: "",
    ...overrides
  };
}

function defaultChangeOrder(overrides = {}) {
  return {
    description: "",
    labourHours: 0,
    materials: 0,
    subcontractor: 0,
    other: 0,
    status: "Pending approval",
    approvalDate: todayISO(),
    ...overrides
  };
}

function defaultTask(overrides = {}) {
  return {
    status: "Pending",
    task: "",
    assignedTo: "Danny",
    startDate: todayISO(),
    dueDate: todayISO(),
    snoozedUntil: "",
    silenced: false,
    ...overrides
  };
}

function defaultJobMaterial(overrides = {}) {
  return {
    item: "",
    status: "Pickup pending",
    supplier: "",
    neededBy: todayISO(),
    note: "",
    ...overrides
  };
}

function defaultSiteLog(overrides = {}) {
  return {
    date: todayISO(),
    note: "",
    ...overrides
  };
}

function defaultCommunication(overrides = {}) {
  return {
    date: todayISO(),
    type: "Text",
    note: "",
    ...overrides
  };
}

function defaultPhoto(overrides = {}) {
  return {
    date: todayISO(),
    category: "Progress",
    filename: "",
    note: "",
    dataUrl: "",
    ...overrides
  };
}

function defaultCloseout() {
  return [
    { label: "Final payment received", done: false },
    { label: "Client walkthrough complete", done: false },
    { label: "Photos uploaded", done: false },
    { label: "Warranty issued", done: false },
    { label: "Final cleanup complete", done: false },
    { label: "Job marked complete", done: false }
  ];
}

function applyJobTemplate(type, overwrite = false) {
  const template = jobTypeTemplates[type] || jobTypeTemplates["General Renovation"];
  for (const key of ["timeline", "includedWork", "excludedWork", "finishLevel", "paymentSchedule"]) {
    if (overwrite || !state.project[key]) state.project[key] = template[key] || "";
  }
  if (overwrite || !numberValue(state.settings.contingencyRate)) {
    state.settings.contingencyRate = template.contingencyRate;
  }
  if (type === "Handyman Job") {
    state.settings.pricingMethod = "quick";
    state.costs.quickRiskLevel = "low";
  } else {
    state.settings.pricingMethod = "detailed";
    state.costs.quickRiskLevel = type === "Basement Remodel" ? "high" : "medium";
  }
  if (overwrite) applyProjectStarterItems(type);
}

function applyProjectStarterItems(type) {
  const starters = {
    "Bathroom Remodel": {
      roomsAreas: "Bathroom / ensuite areas listed in approved scope.",
      scopeOfWork: "Bathroom renovation including demolition, waterproofing where specified, tile or flooring installation, vanity/toilet/fixture installation, trim, paint touch-ups, disposal, and cleanup.",
      lines: [],
      subs: []
    },
    "Kitchen Remodel": {
      roomsAreas: "Kitchen and adjacent areas listed in approved scope.",
      scopeOfWork: "Kitchen renovation including demolition, cabinet installation coordination, backsplash, flooring or trim work where specified, appliance coordination, disposal, protection, and cleanup.",
      lines: [],
      subs: []
    },
    "Basement Remodel": {
      roomsAreas: "Basement areas listed in approved scope.",
      scopeOfWork: "Basement renovation including framing, drywall, flooring, trim, painting, electrical/plumbing coordination where specified, protection, disposal, and cleanup.",
      lines: [],
      subs: []
    },
    "Handyman Job": {
      roomsAreas: "Small repair or installation areas listed in approved scope.",
      scopeOfWork: "Handyman service for listed small repairs or installations, including basic setup, ordinary cleanup, and standard small consumables.",
      lines: [],
      subs: []
    }
  };
  const starter = starters[type];
  if (!starter) return;
  state.project.roomsAreas = starter.roomsAreas;
  state.project.scopeOfWork = starter.scopeOfWork;
  state.lines = starter.lines;
  state.subs = starter.subs;
}

function ensureStateShape() {
  state.settings = {
    ...presets.premium,
    depositPaid: 0,
    standardSavingsRate: 5,
    dannyPayRate: 35,
    julianPayRate: 35,
    quoteNumber: quoteNumber(),
    quoteDate: todayISO(),
    validUntil: futureISO(14),
    ...state.settings
  };
  state.project = {
    clientName: "",
    clientPhone: "",
    projectAddress: "",
    clientEmail: "",
    projectType: "Bathroom Remodel",
    jobStatus: "Draft",
    materialSupply: "Claybourne supplied",
    timeline: "",
    specialConditions: "",
    scopeOfWork: "",
    roomsAreas: "",
    finishLevel: "",
    includedWork: "",
    excludedWork: "",
    siteConditions: [],
    siteNotes: "",
    paymentSchedule: "",
    ...defaultTerms,
    ...state.project
  };
  if (!jobTypeTemplates[state.project.projectType]) state.project.projectType = "General Renovation";
  if (!["Claybourne supplied", "Client supplied", "Mixed supply"].includes(state.project.materialSupply)) {
    state.project.materialSupply = "Claybourne supplied";
  }
  if (!Array.isArray(state.project.siteConditions)) state.project.siteConditions = [];
  state.costs = {
    prepHours: 1,
    travelHours: 1,
    pickupHours: 1,
    cleanupHours: 1,
    adminHours: 1,
    helperCost: 0,
    permitCost: 0,
    disposalCost: 150,
    protectionCost: 85,
    miscCost: 0,
    quickWorkers: 2,
    quickDays: 1,
    quickHoursPerDay: 7,
    quickMaterialCost: 0,
    quickOtherCost: 0,
    quickRiskLevel: "medium",
    ...state.costs
  };
  state.lines = Array.isArray(state.lines) ? state.lines : [];
  state.subs = Array.isArray(state.subs) ? state.subs : [];
  state.payments = Array.isArray(state.payments) ? state.payments : [];
  state.expenses = Array.isArray(state.expenses) ? state.expenses : [];
  state.tasks = Array.isArray(state.tasks) ? state.tasks : [];
  state.tasks = state.tasks.map(task => defaultTask(task));
  state.jobMaterials = Array.isArray(state.jobMaterials) ? state.jobMaterials : [];
  state.jobMaterials = state.jobMaterials.map(item => defaultJobMaterial(item));
  state.siteLogs = Array.isArray(state.siteLogs) ? state.siteLogs : [];
  state.siteLogs = state.siteLogs.map(item => defaultSiteLog(item));
  state.communications = Array.isArray(state.communications) ? state.communications : [];
  state.communications = state.communications.map(item => defaultCommunication(item));
  state.photos = Array.isArray(state.photos) ? state.photos : [];
  state.photos = state.photos.map(item => defaultPhoto(item));
  state.closeout = Array.isArray(state.closeout) && state.closeout.length ? state.closeout : defaultCloseout();
  state.changeOrders = Array.isArray(state.changeOrders) ? state.changeOrders : [];
  state.meta = {
    finalized: false,
    dirty: false,
    lastSavedAt: "",
    ...state.meta
  };
  if (state.settings.standardSavingsRate === undefined || state.settings.standardSavingsRate === null || state.settings.standardSavingsRate === "") {
    state.settings.standardSavingsRate = 5;
  }
  if (state.settings.dannyPayRate === undefined || state.settings.dannyPayRate === null || state.settings.dannyPayRate === "") state.settings.dannyPayRate = 35;
  if (state.settings.julianPayRate === undefined || state.settings.julianPayRate === null || state.settings.julianPayRate === "") state.settings.julianPayRate = 35;
  if (!state.settings.quoteNumber || !state.settings.quoteNumber.startsWith("CLY-")) {
    state.settings.quoteNumber = quoteNumber();
    state.meta.finalized = false;
  }
  applyJobTemplate(state.project.projectType);
}

function loadState() {
  const saved = localStorage.getItem("claybourneQuoteBuilder");
  if (saved) {
    Object.assign(state, JSON.parse(saved));
    ensureStateShape();
    return;
  }

  state.settings = {
    ...presets.premium,
    depositPaid: 0,
    standardSavingsRate: 5,
    dannyPayRate: 35,
    julianPayRate: 35,
    quoteNumber: quoteNumber(),
    quoteDate: todayISO(),
    validUntil: futureISO(14)
  };
  state.project = {
    clientName: "",
    clientPhone: "",
    projectAddress: "",
    clientEmail: "",
    projectType: "Bathroom Remodel",
    jobStatus: "Draft",
    materialSupply: "Claybourne supplied",
    timeline: "",
    specialConditions: "",
    scopeOfWork: "",
    roomsAreas: "Bathroom / ensuite areas listed in approved scope.",
    finishLevel: "",
    includedWork: "",
    excludedWork: "",
    siteConditions: ["Hidden damage possible"],
    siteNotes: "",
    paymentSchedule: "",
    ...defaultTerms
  };
  applyJobTemplate(state.project.projectType, true);
  state.costs = {
    prepHours: 0,
    travelHours: 0,
    pickupHours: 0,
    cleanupHours: 0,
    adminHours: 0,
    helperCost: 0,
    permitCost: 0,
    disposalCost: 0,
    protectionCost: 0,
    miscCost: 0,
    quickWorkers: 2,
    quickDays: 1,
    quickHoursPerDay: 7,
    quickMaterialCost: 0,
    quickOtherCost: 0,
    quickRiskLevel: "medium"
  };
  state.lines = [];
  state.subs = [];
  state.payments = [];
  state.expenses = [];
  state.tasks = [
    defaultTask({ task: "Confirm client selections", assignedTo: "Danny" }),
    defaultTask({ task: "Schedule material pickup", assignedTo: "Julian" })
  ];
  state.jobMaterials = [];
  state.siteLogs = [];
  state.communications = [];
  state.photos = [];
  state.closeout = defaultCloseout();
  state.changeOrders = [];
  state.meta = { finalized: false, dirty: false, lastSavedAt: "" };
}

function saveState() {
  state.meta.lastSavedAt = new Date().toISOString();
  localStorage.setItem("claybourneQuoteBuilder", JSON.stringify(state));
  renderSaveStatus();
  scheduleActiveQuoteSync();
}

function stateSnapshot() {
  return JSON.parse(JSON.stringify({
    settings: state.settings,
    project: state.project,
    lines: state.lines,
    costs: state.costs,
    subs: state.subs,
    payments: state.payments,
    expenses: state.expenses,
    tasks: state.tasks,
    jobMaterials: state.jobMaterials,
    siteLogs: state.siteLogs,
    communications: state.communications,
    photos: state.photos,
    closeout: state.closeout,
    changeOrders: state.changeOrders,
    meta: state.meta
  }));
}

function archiveEntries() {
  try {
    return JSON.parse(localStorage.getItem(archiveKey)) || [];
  } catch {
    return [];
  }
}

function saveArchiveEntries(entries) {
  localStorage.setItem(archiveKey, JSON.stringify(dedupeArchiveEntries(entries)));
}

function archiveCurrentQuote(status = "Saved") {
  const t = totals();
  const entries = archiveEntries();
  const id = state.meta.archiveId || `${state.settings.quoteNumber}-${Date.now()}`;
  state.meta.archiveId = id;
  state.meta.dirty = false;
  const record = {
    id,
    quoteNumber: state.settings.quoteNumber,
    clientName: state.project.clientName || "Unnamed Client",
    projectType: state.project.projectType || "Client Quote",
    projectAddress: state.project.projectAddress || "",
    quoteDate: state.settings.quoteDate,
    totalQuote: t.totalQuote,
    status: state.project.jobStatus || status,
    savedAt: new Date().toISOString(),
    snapshot: stateSnapshot()
  };
  const key = archiveDedupKey(record);
  const existing = entries.findIndex(entry => entry.id === id || archiveDedupKey(entry) === key);
  if (existing >= 0) entries[existing] = record;
  else entries.unshift(record);
  saveArchiveEntries(entries);
  saveState();
  renderArchive();
  saveArchiveRecordToSupabase(record);
  return record;
}

function renderArchive() {
  const select = document.getElementById("archiveList");
  const cards = document.getElementById("archiveCards");
  if (!select) return;
  const search = (document.getElementById("archiveSearch")?.value || "").trim().toLowerCase();
  const status = document.getElementById("archiveStatusFilter")?.value || "";
  const entries = archiveEntries().filter(entry => {
    const haystack = `${entry.quoteNumber} ${entry.clientName} ${entry.projectType} ${entry.projectAddress}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    const matchesStatus = !status || entry.status === status;
    return matchesSearch && matchesStatus;
  });
  if (!entries.length) {
    select.innerHTML = `<option value="">No saved quotes yet</option>`;
    if (cards) cards.innerHTML = `<div class="empty-state">No saved quotes match this search.</div>`;
    return;
  }
  select.innerHTML = entries.map(entry => {
    const total = money(entry.totalQuote);
    const edited = entry.savedAt ? new Date(entry.savedAt).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Not saved";
    const label = `${entry.quoteNumber} | ${entry.clientName} | ${entry.status || "Draft"} | ${total} | ${edited}`;
    return `<option value="${escapeAttr(entry.id)}">${escapeHTML(label)}</option>`;
  }).join("");
  if (cards) {
    cards.innerHTML = entries.map(entry => {
      const total = money(entry.totalQuote);
      const edited = entry.savedAt ? new Date(entry.savedAt).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Not saved";
      return `
        <button class="archive-card" type="button" data-archive-card="${escapeAttr(entry.id)}">
          <span>${escapeHTML(entry.status || "Draft")}</span>
          <strong>${escapeHTML(entry.clientName || "Unnamed Client")}</strong>
          <small>${escapeHTML(entry.projectType || "Project")} | ${escapeHTML(entry.projectAddress || "No address")}</small>
          <b>${total}</b>
          <em>${escapeHTML(entry.quoteNumber || "No quote #")} | Last edited ${escapeHTML(edited)}</em>
        </button>
      `;
    }).join("");
  }
}

function renderPricingMode() {
  if (state.project.projectType === "Handyman Job") {
    state.settings.pricingMethod = "quick";
  } else {
    state.settings.pricingMethod = "detailed";
  }
  const quick = state.settings.pricingMethod === "quick";
  const pricingMethod = document.getElementById("pricingMethod");
  if (pricingMethod) pricingMethod.value = state.settings.pricingMethod;
  document.body.classList.toggle("simple-mode", quick);
  document.getElementById("quickPricingPanel")?.classList.toggle("is-hidden", !quick);
  document.querySelectorAll(".detailed-panel").forEach(panel => {
    panel.classList.toggle("is-hidden", quick);
  });
  const accountingAdvanced = document.querySelector(".accounting-advanced");
  if (accountingAdvanced && quick) accountingAdvanced.open = false;
}

function materialMatchesScope(product) {
  const text = `${state.project.scopeOfWork || ""} ${state.project.includedWork || ""} ${state.project.projectType || ""}`.toLowerCase();
  return (product.keywords || []).some(keyword => text.includes(keyword));
}

function manualSupplierMaterials() {
  try {
    return JSON.parse(localStorage.getItem(manualMaterialsKey)) || [];
  } catch {
    return [];
  }
}

function compactManualMaterialForBackup(item) {
  return {
    id: item.id,
    name: item.name,
    supplier: item.supplier,
    sku: item.sku || "",
    model: item.model || "",
    unit: item.unit || "each",
    unitPrice: numberValue(item.unitPrice),
    url: item.url || "",
    lastChecked: item.lastChecked || "",
    category: item.category || "Custom",
    storageImage: item.storageImage || (item.image?.startsWith("storage:material-images:") ? item.image : ""),
    image: item.image?.startsWith("storage:material-images:") ? item.image : "",
    keywords: item.keywords || [],
    quoteMaterial: item.quoteMaterial || quoteMaterialForCategory(item.category || "Custom"),
    manual: true,
    cloudSynced: Boolean(item.cloudSynced)
  };
}

function saveManualSupplierMaterials(items) {
  const compactItems = items.map(compactManualMaterialForBackup);
  try {
    localStorage.setItem(manualMaterialsKey, JSON.stringify(compactItems));
  } catch (error) {
    localStorage.removeItem(manualMaterialsKey);
    localStorage.setItem(manualMaterialsKey, JSON.stringify(compactItems.map(item => ({ ...item, image: "" }))));
  }
}

function materialCategorySelectOptions(includeAll = false) {
  const options = materialCategoryOptions
    .map(category => `<option value="${escapeAttr(category)}">${escapeHTML(category)}</option>`)
    .join("");
  return includeAll ? `<option value="">All categories</option>${options}` : options;
}

function populateMaterialCategorySelects() {
  const categoryFilter = document.getElementById("materialCategoryFilter");
  const manualCategory = document.getElementById("manualCategory");
  if (categoryFilter) {
    const current = categoryFilter.value;
    categoryFilter.innerHTML = materialCategorySelectOptions(true);
    categoryFilter.value = [...categoryFilter.options].some(option => option.value === current) ? current : "";
  }
  if (manualCategory) {
    const current = manualCategory.value;
    manualCategory.innerHTML = materialCategorySelectOptions(false);
    manualCategory.value = [...manualCategory.options].some(option => option.value === current) ? current : "Custom";
  }
}

function quoteMaterialForCategory(category) {
  const map = {
    Tile: "Tile",
    Waterproofing: "Custom material",
    Drywall: "Drywall sheet",
    Flooring: "Flooring",
    Paint: "Primer / paint",
    Plumbing: "Plumbing fixture",
    Electrical: "Electrical fixture",
    Fasteners: "Fasteners / adhesive",
    "Adhesives / Sealants": "Fasteners / adhesive",
    "Lumber / Framing": "Lumber / framing",
    "Concrete / Masonry": "Custom material",
    "Decking / Outdoor": "Lumber / framing",
    Hardware: "Cabinet hardware",
    "Tools / Equipment": "Custom material",
    "Doors / Windows": "Custom material",
    "Trim / Millwork": "Trim / casing",
    "Cabinets / Countertops": "Cabinet hardware",
    Insulation: "Custom material",
    "Roofing / Exterior": "Custom material",
    "HVAC / Ventilation": "Custom material",
    "Safety / Protection": "Custom material",
    "Cleaning / Consumables": "Custom material",
    Disposal: "Custom material",
    Custom: "Custom material"
  };
  return map[category] || "Custom material";
}

function renderMaterialCatalog() {
  const list = document.getElementById("materialProductList");
  if (!list) return;
  const query = (document.getElementById("materialSearch")?.value || "").trim().toLowerCase();
  const category = document.getElementById("materialCategoryFilter")?.value || "";
  const uniqueMaterials = [...supplierMaterials.reduce((map, product) => {
    if (!map.has(product.id)) map.set(product.id, product);
    return map;
  }, new Map()).values()];
  const baseMatches = uniqueMaterials
    .filter(product => !category || product.category === category)
    .filter(product => {
      const haystack = `${product.name} ${product.category} ${product.supplier} ${product.sku || ""} ${(product.keywords || []).join(" ")}`.toLowerCase();
      return query ? haystack.includes(query) : materialMatchesScope(product);
    })
    .sort((a, b) => {
      const scopeDelta = Number(materialMatchesScope(b)) - Number(materialMatchesScope(a));
      if (scopeDelta) return scopeDelta;
      const aHasPrice = Number(a.unitPrice) > 0;
      const bHasPrice = Number(b.unitPrice) > 0;
      if (aHasPrice !== bHasPrice) return Number(bHasPrice) - Number(aHasPrice);
      return numberValue(a.unitPrice) - numberValue(b.unitPrice);
    });
  const filtered = baseMatches.slice(0, query ? 40 : 12);
  if (!filtered.length) {
    list.innerHTML = query || category
      ? `<div class="empty-state">No saved materials match that search.</div>`
      : `<div class="empty-state">Search saved materials or add a new material manually.</div>`;
    return;
  }
  list.innerHTML = filtered.map(product => {
    const hasPrice = Number(product.unitPrice) > 0;
    return `
    <article class="material-product-card ${materialMatchesScope(product) ? "is-suggested" : ""} ${hasPrice ? "" : "needs-price"}">
      ${product.image ? `<img class="material-product-image" src="${escapeAttr(product.image)}" alt="">` : ""}
      <div>
        <span>${escapeHTML(product.category)} | ${escapeHTML(product.supplier)}</span>
        <strong>${escapeHTML(product.name)}</strong>
        <small>${escapeHTML([product.sku ? `SKU ${product.sku}` : "", product.unit ? `Unit: ${product.unit}` : ""].filter(Boolean).join(" | "))}</small>
      </div>
      <b class="${hasPrice ? "" : "missing-material-price"}">${hasPrice ? `${money(product.unitPrice)} / ${escapeHTML(product.unit)}` : "Price not entered"}</b>
      <div class="material-product-actions">
        <button class="secondary-button" type="button" data-use-material="${escapeAttr(product.id)}">${hasPrice ? "Use in quote" : "Enter price"}</button>
        <button class="ghost-button" type="button" data-edit-material="${escapeAttr(product.id)}">Edit</button>
        ${product.url ? `<a class="ghost-button" href="${escapeAttr(product.url)}" target="_blank" rel="noreferrer">Open supplier</a>` : ""}
      </div>
    </article>
  `;
  }).join("");
}

function setManualMaterialFields(data) {
  const fields = {
    manualProductName: data.name,
    manualSupplier: data.supplier,
    manualSku: data.sku,
    manualUnit: data.unit,
    manualPrice: data.unitPrice,
    manualUrl: data.url,
    manualCheckedDate: data.lastChecked || todayISO(),
    manualCategory: data.category
  };
  Object.entries(fields).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field && value !== undefined && value !== null) field.value = value;
  });
  manualMaterialStorageImageRef = data.storageImage || (data.image?.startsWith("storage:material-images:") ? data.image : "");
  setManualMaterialImagePreview(data.image || "");
}

function setManualMaterialImagePreview(src) {
  const preview = document.getElementById("manualImagePreview");
  manualMaterialImageDataUrl = src || "";
  if (!preview) return;
  preview.src = manualMaterialImageDataUrl;
  preview.classList.toggle("is-hidden", !manualMaterialImageDataUrl);
}

async function setManualMaterialImageFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  try {
    manualMaterialImageFile = file;
    setManualMaterialImagePreview(await readPhotoFile(file));
  } catch {
    window.alert("That material image could not be added.");
  }
}

function editSupplierMaterial(id) {
  const product = supplierMaterials.find(item => item.id === id);
  if (!product) return;
  editingMaterialId = id;
  setManualMaterialFields({
    name: product.name,
    supplier: product.supplier,
    sku: product.sku || "",
    unit: product.unit || "each",
    unitPrice: product.unitPrice,
    url: product.url || "",
    lastChecked: product.lastChecked || todayISO(),
    category: product.category || "Custom",
    image: product.image || "",
    storageImage: product.storageImage || ""
  });
  const entry = document.querySelector(".manual-material-entry");
  if (entry) {
    entry.open = true;
    entry.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  const saveButton = document.getElementById("saveManualMaterial");
  if (saveButton) saveButton.textContent = "Update Material";
}

function categoryFromMaterialText(text) {
  const value = text.toLowerCase();
  if (/deck\s*block|patio\s*stone|paver|concrete|cement|masonry|sonotube|gravel|sand|rebar|brick|cinder\s*block/.test(value)) return "Concrete / Masonry";
  if (/deck|decking|fence|fencing|post|outdoor|landscape|landscaping|railing|baluster/.test(value)) return "Decking / Outdoor";
  if (/grout|thinset|mortar|tile|spacer|level(l)?ing/.test(value)) return "Tile";
  if (/waterproof|membrane|kerdi|redgard|mapelastic/.test(value)) return "Waterproofing";
  if (/drywall|cement board|durock|backer/.test(value)) return "Drywall";
  if (/flooring|vinyl|laminate/.test(value)) return "Flooring";
  if (/paint|primer|stain/.test(value)) return "Paint";
  if (/toilet|vanity|faucet|plumbing|shower|valve|drain|pipe|supply line/.test(value)) return "Plumbing";
  if (/electrical|light|fan|switch|outlet|wire|breaker|fixture/.test(value)) return "Electrical";
  if (/caulk|silicone|adhesive|glue|sealant/.test(value)) return "Adhesives / Sealants";
  if (/fastener|screw|nail|anchor|bolt|washer|clip|bracket|hinge/.test(value)) return "Fasteners";
  if (/lumber|stud|plywood|osb|joist|framing|two by|2x4|2 x 4|2x6|2 x 6/.test(value)) return "Lumber / Framing";
  if (/door|window|trim|casing|baseboard|moulding|molding/.test(value)) return /door|window/.test(value) ? "Doors / Windows" : "Trim / Millwork";
  if (/cabinet|countertop|counter top|hardware|pull|knob/.test(value)) return /cabinet|counter/.test(value) ? "Cabinets / Countertops" : "Hardware";
  if (/insulation|roxul|rockwool|fiberglass|vapou?r barrier/.test(value)) return "Insulation";
  if (/roof|shingle|siding|soffit|fascia|gutter|exterior/.test(value)) return "Roofing / Exterior";
  if (/hvac|vent|duct|register/.test(value)) return "HVAC / Ventilation";
  if (/mask|glove|respirator|tarp|drop cloth|protection|poly sheeting/.test(value)) return "Safety / Protection";
  if (/clean|cleaner|solvent|rag|wipe|broom|garbage bag|trash bag/.test(value)) return "Cleaning / Consumables";
  if (/bin|disposal|dump/.test(value)) return "Disposal";
  return "Custom";
}

function parseMaterialText(text) {
  const lines = String(text || "")
    .split(/\n+/)
    .map(line => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const fullText = lines.join(" ");
  const priceMatch = fullText.match(/\$\s*([0-9][0-9,]*(?:\.[0-9]{2})?)/);
  const centsMatch = fullText.match(/([0-9]{1,2})\s*Cents/i);
  const skuMatch = fullText.match(/SKU\s*#?\s*([A-Za-z0-9-]+)/i);
  const modelMatch = fullText.match(/Model\s*#?\s*([A-Za-z0-9-]+)/i);
  const urlMatch = fullText.match(/https?:\/\/\S+/i);
  const supplier = /rona/i.test(fullText) ? "RONA"
    : /home\s*hardware/i.test(fullText) ? "Home Hardware"
      : /lowe'?s/i.test(fullText) ? "Lowe's"
        : /home\s*depot|homedepot/i.test(fullText) ? "Home Depot"
          : "";
  let unitPrice = priceMatch ? numberValue(priceMatch[1].replace(/,/g, "")) : 0;
  if (unitPrice && centsMatch && !String(priceMatch[1]).includes(".")) unitPrice += numberValue(centsMatch[1]) / 100;
  const unitMatch = fullText.match(/\/\s*(each|sq\.?\s*ft|bag|sheet|box|roll|pail|tube|pack|case)/i);
  const blocked = /^(add to cart|compare|free delivery|delivery|view details|more options|buy|burlington|and|cents|limited stock|in stock|saved to list)$/i;
  const name = lines.find(line => {
    return line.length > 14
      && !line.includes("$")
      && !/SKU|Model|Cents|http|Add To Cart|Compare|Delivery|Burlington/i.test(line)
      && !blocked.test(line);
  }) || "";
  return {
    name,
    supplier,
    sku: skuMatch?.[1] || modelMatch?.[1] || "",
    unit: unitMatch?.[1]?.replace(/\s+/g, " ") || "each",
    unitPrice: unitPrice ? Number(unitPrice.toFixed(2)) : "",
    url: urlMatch?.[0] || "",
    lastChecked: todayISO(),
    category: categoryFromMaterialText(fullText)
  };
}

function fillMaterialFromOcrText() {
  const text = document.getElementById("materialOcrText")?.value || "";
  const status = document.getElementById("materialOcrStatus");
  const parsed = parseMaterialText(text);
  setManualMaterialFields(parsed);
  if (status) {
    status.innerHTML = parsed.name || parsed.unitPrice
      ? `<div class="is-clear">Fields filled from screenshot text. Please review before saving.</div>`
      : `<div>Could not find enough product details. You can still type the missing fields manually.</div>`;
  }
}

function setMaterialScreenshotFile(file) {
  const preview = document.getElementById("materialScreenshotPreview");
  const status = document.getElementById("materialOcrStatus");
  if (!file || !file.type.startsWith("image/")) {
    if (status) status.innerHTML = `<div>Please choose an image file.</div>`;
    return;
  }
  materialScreenshotFile = file;
  if (preview) {
    if (preview.dataset.objectUrl) URL.revokeObjectURL(preview.dataset.objectUrl);
    const url = URL.createObjectURL(file);
    preview.dataset.objectUrl = url;
    preview.src = url;
    preview.classList.remove("is-hidden");
  }
  if (status) status.innerHTML = `<div class="is-clear">Screenshot added. Reading it now...</div>`;
  window.setTimeout(extractMaterialFromScreenshot, 100);
}

async function extractMaterialFromScreenshot() {
  const input = document.getElementById("materialScreenshotInput");
  const status = document.getElementById("materialOcrStatus");
  const textArea = document.getElementById("materialOcrText");
  const file = materialScreenshotFile || input?.files?.[0];
  if (!file) {
    window.alert("Please upload a product screenshot first.");
    return;
  }
  if (!window.Tesseract?.recognize) {
    window.alert("Screenshot reading is not available in this browser session. You can paste product text into the box instead.");
    return;
  }
  if (status) status.innerHTML = `<div>Reading screenshot. This can take a moment...</div>`;
  try {
    const result = await window.Tesseract.recognize(file, "eng", {
      workerPath: "tesseract-worker.min.js",
      corePath: "tesseract-core/tesseract-core-simd-lstm.js",
      langPath: "https://tessdata.projectnaptha.com/4.0.0",
      logger: progress => {
        if (status && progress.status) {
          const percent = progress.progress ? ` ${Math.round(progress.progress * 100)}%` : "";
          status.innerHTML = `<div>Reading screenshot: ${escapeHTML(progress.status)}${percent}</div>`;
        }
      }
    });
    if (textArea) textArea.value = result.data.text || "";
    fillMaterialFromOcrText();
  } catch (error) {
    if (status) status.innerHTML = `<div>Screenshot reading failed. If the app is opened as a file, use a local web URL or paste copied product text into the box, then use Fill Fields From Text.</div>`;
  }
}

function useSupplierMaterial(id) {
  const product = supplierMaterials.find(item => item.id === id);
  if (!product) return;
  if (numberValue(product.unitPrice) <= 0) {
    editSupplierMaterial(id);
    const priceField = document.getElementById("manualPrice");
    if (priceField) priceField.focus();
    return;
  }
  if (state.settings.pricingMethod === "quick") {
    state.costs.quickMaterialCost = numberValue(state.costs.quickMaterialCost) + product.unitPrice;
  } else {
    state.lines.push(defaultLine({
      area: product.category,
      description: product.name,
      material: product.quoteMaterial,
      qty: 1,
      marketRate: product.unitPrice,
      hours: 0,
      other: 0
    }));
  }
  state.meta.dirty = true;
  activeStep = state.settings.pricingMethod === "quick" ? "pricing" : activeStep;
  render();
}

function clearManualMaterialForm() {
  for (const id of ["manualProductName", "manualSupplier", "manualSku", "manualUnit", "manualPrice", "manualUrl", "manualCheckedDate", "materialOcrText"]) {
    const field = document.getElementById(id);
    if (field) field.value = "";
  }
  const category = document.getElementById("manualCategory");
  if (category) category.value = "Custom";
  const screenshot = document.getElementById("materialScreenshotInput");
  if (screenshot) screenshot.value = "";
  const manualImage = document.getElementById("manualImageInput");
  if (manualImage) manualImage.value = "";
  editingMaterialId = null;
  manualMaterialImageFile = null;
  manualMaterialStorageImageRef = "";
  setManualMaterialImagePreview("");
  const saveButton = document.getElementById("saveManualMaterial");
  if (saveButton) saveButton.textContent = "Save Material";
  materialScreenshotFile = null;
  const preview = document.getElementById("materialScreenshotPreview");
  if (preview) {
    if (preview.dataset.objectUrl) URL.revokeObjectURL(preview.dataset.objectUrl);
    preview.dataset.objectUrl = "";
    preview.src = "";
    preview.classList.add("is-hidden");
  }
  const status = document.getElementById("materialOcrStatus");
  if (status) status.innerHTML = "";
}

async function saveManualMaterial() {
  const name = document.getElementById("manualProductName")?.value.trim();
  const supplier = document.getElementById("manualSupplier")?.value.trim();
  const unitPrice = numberValue(document.getElementById("manualPrice")?.value);
  if (!name || !supplier || unitPrice <= 0) {
    window.alert("Please add at least product name, supplier, and last known price.");
    return;
  }
  const category = document.getElementById("manualCategory")?.value || "Custom";
  const materialId = editingMaterialId || `manual-${Date.now()}`;
  const uploadedImageRef = await uploadMaterialImageToSupabase(manualMaterialImageFile, materialId);
  const storageImageRef = uploadedImageRef || manualMaterialStorageImageRef;
  const imagePreviewUrl = await resolveMaterialImageUrl(storageImageRef) || manualMaterialImageDataUrl;
  const item = {
    id: materialId,
    name,
    supplier,
    sku: document.getElementById("manualSku")?.value.trim() || "",
    unit: document.getElementById("manualUnit")?.value.trim() || "each",
    unitPrice,
    url: document.getElementById("manualUrl")?.value.trim() || "",
    lastChecked: document.getElementById("manualCheckedDate")?.value || todayISO(),
    category,
    image: imagePreviewUrl,
    storageImage: storageImageRef,
    keywords: [name, supplier, category].join(" ").toLowerCase().split(/\s+/).filter(Boolean),
    quoteMaterial: quoteMaterialForCategory(category),
    manual: true
  };
  const manualItems = manualSupplierMaterials().filter(material => material.id !== item.id);
  manualItems.unshift(item);
  saveManualSupplierMaterials(manualItems);
  const existingIndex = supplierMaterials.findIndex(material => material.id === item.id);
  if (existingIndex >= 0) supplierMaterials.splice(existingIndex, 1);
  supplierMaterials.unshift(item);
  await saveManualMaterialToSupabase(item);
  clearManualMaterialForm();
  renderMaterialCatalog();
}

function loadArchivedQuote(id) {
  const record = archiveEntries().find(entry => entry.id === id);
  if (!record) return;
  Object.assign(state, JSON.parse(JSON.stringify(record.snapshot)));
  state.meta = { ...state.meta, archiveId: id, finalized: true };
  ensureStateShape();
  render();
}

function deleteArchivedQuote(id) {
  if (!id) return;
  saveArchiveEntries(archiveEntries().filter(entry => entry.id !== id));
  deleteArchiveRecordFromSupabase(id);
  if (state.meta.archiveId === id) state.meta.archiveId = "";
  renderArchive();
  renderPricingMode();
  saveState();
}

function newClientState() {
  const preparedBy = state.settings.preparedBy || "Claybourne Home Renovation";
  state.settings = {
    ...state.settings,
    depositPaid: 0,
    standardSavingsRate: state.settings.standardSavingsRate ?? 5,
    dannyPayRate: state.settings.dannyPayRate ?? 35,
    julianPayRate: state.settings.julianPayRate ?? 35,
    quoteNumber: quoteNumber(sequenceForDate(todayISO()), new Date()),
    quoteDate: todayISO(),
    validUntil: futureISO(14),
    preparedBy
  };
  state.project = {
    clientName: "",
    clientPhone: "",
    projectAddress: "",
    clientEmail: "",
    projectType: "Bathroom Remodel",
    jobStatus: "Draft",
    materialSupply: "Claybourne supplied",
    timeline: "",
    specialConditions: "",
    scopeOfWork: "",
    roomsAreas: "",
    finishLevel: "",
    includedWork: "",
    excludedWork: "",
    siteConditions: [],
    siteNotes: "",
    paymentSchedule: "",
    ...defaultTerms
  };
  applyJobTemplate(state.project.projectType, true);
  state.costs = {
    prepHours: 0,
    travelHours: 0,
    pickupHours: 0,
    cleanupHours: 0,
    adminHours: 0,
    helperCost: 0,
    permitCost: 0,
    disposalCost: 0,
    protectionCost: 0,
    miscCost: 0,
    quickWorkers: 2,
    quickDays: 1,
    quickHoursPerDay: 7,
    quickMaterialCost: 0,
    quickOtherCost: 0,
    quickRiskLevel: "medium"
  };
  state.lines = [];
  state.subs = [];
  state.payments = [];
  state.expenses = [];
  state.tasks = [
    defaultTask({ task: "Confirm client selections", assignedTo: "Danny" }),
    defaultTask({ task: "Schedule material pickup", assignedTo: "Julian" })
  ];
  state.jobMaterials = [];
  state.siteLogs = [];
  state.communications = [];
  state.photos = [];
  state.closeout = defaultCloseout();
  state.changeOrders = [];
  state.meta = { finalized: false, dirty: false, lastSavedAt: "" };
}

function syncControls() {
  for (const id of settingIds) {
    const field = document.getElementById(id);
    if (field) field.value = state.settings[id] ?? "";
  }
  for (const id of projectIds) {
    const field = document.getElementById(id);
    if (field) field.value = state.project[id] ?? "";
  }
  for (const id of costIds) {
    const field = document.getElementById(id);
    if (field) field.value = state.costs[id] ?? "";
  }
  const riskField = document.getElementById("quickRiskLevel");
  if (riskField) riskField.value = state.costs.quickRiskLevel ?? "medium";
  const presetMirror = document.getElementById("pricingPresetMirror");
  const presetSelect = document.getElementById("presetSelect");
  if (presetMirror && presetSelect) presetMirror.value = presetSelect.value;
}

function lineCost(line) {
  const rawMaterialCost = numberValue(line.qty) * numberValue(line.marketRate) * qualityMultipliers[line.quality];
  const materialWaste = rawMaterialCost * numberValue(state.settings.wasteRate) / 100;
  const materialMarkup = state.project.materialSupply === "Client supplied" ? 0 : (rawMaterialCost + materialWaste) * numberValue(state.settings.materialMarkupRate) / 100;
  const materialCost = rawMaterialCost + materialWaste + materialMarkup;
  const labourCost = 0;
  const preSavingsTotal = materialCost + labourCost + numberValue(line.other);
  const savingsRate = line.savings === null || line.savings === undefined || line.savings === "" ? numberValue(state.settings.standardSavingsRate) : numberValue(line.savings);
  const savingsAmount = preSavingsTotal * savingsRate / 100;
  const lineTotal = Math.max(0, preSavingsTotal - savingsAmount);
  return { rawMaterialCost, materialWaste, materialMarkup, materialCost, labourCost, preSavingsTotal, savingsRate, savingsAmount, lineTotal };
}

function quickRiskRate() {
  return { low: 5, medium: 10, high: 15 }[state.costs.quickRiskLevel] ?? numberValue(state.settings.contingencyRate);
}

function totals() {
  const quickMode = state.settings.pricingMethod === "quick";
  const quickLabourHours = numberValue(state.costs.quickWorkers) * numberValue(state.costs.quickDays) * numberValue(state.costs.quickHoursPerDay);
  const quickRawMaterial = numberValue(state.costs.quickMaterialCost);
  const quickMaterialWaste = quickRawMaterial * numberValue(state.settings.wasteRate) / 100;
  const quickMaterialMarkup = state.project.materialSupply === "Client supplied" ? 0 : (quickRawMaterial + quickMaterialWaste) * numberValue(state.settings.materialMarkupRate) / 100;
  const quickLineTotals = {
    materialCost: quickRawMaterial + quickMaterialWaste + quickMaterialMarkup,
    materialMarkup: quickMaterialMarkup,
    labourCost: quickLabourHours * numberValue(state.settings.hourlyRate),
    otherCost: numberValue(state.costs.quickOtherCost),
    savings: 0,
    directLines: quickRawMaterial + quickMaterialWaste + quickMaterialMarkup + (quickLabourHours * numberValue(state.settings.hourlyRate)) + numberValue(state.costs.quickOtherCost)
  };
  const detailedLineTotals = state.lines.reduce((acc, line) => {
    const cost = lineCost(line);
    acc.materialCost += cost.materialCost;
    acc.materialMarkup += cost.materialMarkup;
    acc.labourCost += cost.labourCost;
    acc.otherCost += numberValue(line.other);
    acc.savings += cost.savingsAmount;
    acc.directLines += cost.lineTotal;
    return acc;
  }, { materialCost: 0, materialMarkup: 0, labourCost: 0, otherCost: 0, savings: 0, directLines: 0 });
  const lineTotals = quickMode ? quickLineTotals : detailedLineTotals;
  const extraLabourHours = quickMode ? 0 : costIds.slice(0, 5).reduce((sum, id) => sum + numberValue(state.costs[id]), 0);
  const extraLabourCost = extraLabourHours * numberValue(state.settings.hourlyRate);
  const subCost = quickMode ? 0 : state.subs.reduce((sum, sub) => sum + numberValue(sub.cost), 0);
  const subMarkupCost = subCost * numberValue(state.settings.subMarkupRate) / 100;
  const fixedCosts = quickMode ? 0 : numberValue(state.costs.helperCost) + numberValue(state.costs.permitCost) + numberValue(state.costs.disposalCost) + numberValue(state.costs.protectionCost) + numberValue(state.costs.miscCost);
  const directBeforeMinimum = quickMode
    ? lineTotals.directLines
    : lineTotals.directLines + extraLabourCost + numberValue(state.costs.helperCost) + subCost + numberValue(state.costs.permitCost) + numberValue(state.costs.disposalCost) + numberValue(state.costs.protectionCost) + numberValue(state.costs.miscCost);
  const directCost = Math.max(directBeforeMinimum, numberValue(state.settings.minimumJob));
  const minimumAdjustment = Math.max(0, directCost - directBeforeMinimum);
  const overheadCost = directCost * numberValue(state.settings.overheadRate) / 100;
  const contingencyRate = quickMode ? quickRiskRate() : numberValue(state.settings.contingencyRate);
  const contingencyCost = directCost * contingencyRate / 100;
  const totalWorkerHours = quickMode ? quickLabourHours : extraLabourHours;
  const dannyHours = totalWorkerHours / 2;
  const julianHours = totalWorkerHours / 2;
  const dannyPay = dannyHours * numberValue(state.settings.dannyPayRate);
  const julianPay = julianHours * numberValue(state.settings.julianPayRate);
  const ownerPayTotal = dannyPay + julianPay;
  const profitCost = (directCost + overheadCost + contingencyCost + subMarkupCost) * numberValue(state.settings.profitRate) / 100;
  const changeOrderDirect = state.changeOrders.reduce((sum, order) => {
    return sum + (numberValue(order.labourHours) * numberValue(state.settings.hourlyRate)) + numberValue(order.materials) + numberValue(order.subcontractor) + numberValue(order.other);
  }, 0);
  const subtotal = directCost + overheadCost + contingencyCost + subMarkupCost + profitCost + changeOrderDirect;
  const taxCost = subtotal * numberValue(state.settings.taxRate) / 100;
  const totalQuote = subtotal + taxCost;
  const trackedPayments = state.payments.reduce((sum, payment) => sum + paymentSignedAmount(payment), 0);
  const detailedMaterialFallback = quickMode ? 0 : lineTotals.otherCost + numberValue(state.costs.protectionCost);
  const manualMaterialFallback = numberValue(state.costs.quickMaterialCost);
  const materialDeposit = Math.max(lineTotals.materialCost, detailedMaterialFallback, manualMaterialFallback);
  const deposit = materialDeposit;
  const paymentApplied = Math.max(materialDeposit, numberValue(state.settings.depositPaid), trackedPayments);
  const balance = Math.max(0, totalQuote - paymentApplied);
  return { ...lineTotals, quickMode, quickLabourHours, materialDeposit, paymentApplied, totalWorkerHours, dannyHours, julianHours, dannyPay, julianPay, ownerPayTotal, extraLabourHours, extraLabourCost, subCost, subMarkupCost, fixedCosts, directBeforeMinimum, directCost, minimumAdjustment, overheadCost, contingencyRate, contingencyCost, profitCost, changeOrderDirect, trackedPayments, subtotal, taxCost, totalQuote, deposit, balance };
}

function paymentSignedAmount(payment) {
  const amount = numberValue(payment.amount);
  return ["Refund", "Discount adjustment", "Credit"].includes(payment.type) ? -amount : amount;
}

function actualExpenseTotal() {
  return state.expenses.reduce((sum, expense) => sum + numberValue(expense.amount), 0);
}

function accountingBreakdown() {
  const t = totals();
  const materialActual = t.quickMode
    ? numberValue(state.costs.quickMaterialCost) * (1 + numberValue(state.settings.wasteRate) / 100)
    : state.lines.reduce((sum, line) => {
      const cost = lineCost(line);
      return sum + cost.rawMaterialCost + cost.materialWaste;
    }, 0);
  const ownerLabour = t.ownerPayTotal + numberValue(state.costs.helperCost);
  const permitCost = t.quickMode ? 0 : numberValue(state.costs.permitCost);
  const disposalCost = t.quickMode ? 0 : numberValue(state.costs.disposalCost);
  const protectionCost = t.quickMode ? 0 : numberValue(state.costs.protectionCost);
  const paymentProcessingFees = t.quickMode ? 0 : numberValue(state.costs.miscCost);
  const miscellaneousCost = numberValue(t.otherCost);
  const totalJobCost = materialActual
    + ownerLabour
    + t.subCost
    + permitCost
    + disposalCost
    + protectionCost
    + miscellaneousCost
    + paymentProcessingFees
    + t.changeOrderDirect;
  const grossProfit = t.subtotal - totalJobCost;
  const margin = t.subtotal ? (grossProfit / t.subtotal) * 100 : 0;
  const companyProfitRetained = grossProfit - t.ownerPayTotal;
  const cashReceived = t.trackedPayments;
  const actualCosts = actualExpenseTotal();
  const actualProfit = cashReceived - actualCosts;
  const outstandingReceivables = Math.max(0, t.totalQuote - cashReceived);
  return {
    ...t,
    materialActual,
    ownerLabour,
    permitCost,
    disposalCost,
    protectionCost,
    paymentProcessingFees,
    miscellaneousCost,
    totalJobCost,
    grossProfit,
    margin,
    companyProfitRetained,
    cashReceived,
    actualCosts,
    actualProfit,
    outstandingReceivables,
    depositPaidInput: numberValue(state.settings.depositPaid)
  };
}

function renderLineItems() {
  const body = document.getElementById("lineItems");
  const cards = document.getElementById("lineItemCards");
  if (body) body.innerHTML = "";
  if (cards) cards.innerHTML = "";
  if (!state.lines.length) {
    if (cards) cards.innerHTML = `<div class="empty-state material-empty-state">Please add materials to build this quote.</div>`;
    return;
  }

  state.lines.forEach((line, index) => {
    const cost = lineCost(line);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input class="wide-input" data-field="area" data-index="${index}" value="${escapeAttr(line.area)}" placeholder="Area"></td>
      <td><input class="wide-input" data-field="description" data-index="${index}" value="${escapeAttr(line.description)}" placeholder="Work description"></td>
      <td>
        <select data-field="material" data-index="${index}">
          ${Object.keys(materialCatalog).map(name => `<option value="${name}" ${line.material === name ? "selected" : ""}>${name}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-field="quality" data-index="${index}">
          ${Object.keys(qualityMultipliers).map(name => `<option value="${name}" ${line.quality === name ? "selected" : ""}>${name}</option>`).join("")}
        </select>
      </td>
      <td><input data-field="qty" data-index="${index}" type="number" min="0" step="0.01" value="${line.qty}"></td>
      <td><input data-field="marketRate" data-index="${index}" type="number" min="0" step="0.01" value="${line.marketRate}"></td>
      <td><input data-field="other" data-index="${index}" type="number" min="0" step="0.01" value="${line.other}"></td>
      <td><input data-field="savings" data-index="${index}" type="number" min="0" step="0.5" value="${line.savings ?? ""}" placeholder="${state.settings.standardSavingsRate || 0}%"></td>
      <td class="line-total">${money(cost.lineTotal)}</td>
      <td><button class="icon-button" type="button" data-remove="${index}" aria-label="Remove line">x</button></td>
    `;
    body?.appendChild(row);

    const card = document.createElement("article");
    card.className = "line-card";
    card.innerHTML = `
      <div class="line-card-summary">
        <div>
          <strong>${escapeHTML(line.area || line.description || `Line Item ${index + 1}`)}</strong>
          <span>${escapeHTML(line.description || "Detailed work item")}</span>
        </div>
        <b class="line-total">${money(cost.lineTotal)}</b>
      </div>
      <details ${openLineIndex === index ? "open" : ""}>
        <summary>Material Details</summary>
        <div class="line-card-fields">
          <label>Area / service
            <input data-field="area" data-index="${index}" value="${escapeAttr(line.area)}" placeholder="Area">
          </label>
          <label>Description
            <textarea class="short-textarea" data-field="description" data-index="${index}" rows="3" placeholder="Work description">${escapeHTML(line.description)}</textarea>
          </label>
          <label>Material
            <select data-field="material" data-index="${index}">
              ${Object.keys(materialCatalog).map(name => `<option value="${name}" ${line.material === name ? "selected" : ""}>${name}</option>`).join("")}
            </select>
          </label>
          <label>Quality
            <select data-field="quality" data-index="${index}">
              ${Object.keys(qualityMultipliers).map(name => `<option value="${name}" ${line.quality === name ? "selected" : ""}>${name}</option>`).join("")}
            </select>
          </label>
          <label>Quantity
            <input data-field="qty" data-index="${index}" type="number" min="0" step="0.01" value="${line.qty}">
          </label>
          <label>Market / unit
            <input data-field="marketRate" data-index="${index}" type="number" min="0" step="0.01" value="${line.marketRate}">
          </label>
          <label>Other costs
            <input data-field="other" data-index="${index}" type="number" min="0" step="0.01" value="${line.other}">
          </label>
          <label>Savings %
            <input data-field="savings" data-index="${index}" type="number" min="0" step="0.5" value="${line.savings ?? ""}" placeholder="${state.settings.standardSavingsRate || 0}%">
          </label>
        </div>
        <button class="secondary-button add-line-done-button" type="button" data-close-line="${index}">Add</button>
        <button class="ghost-button remove-line-button" type="button" data-remove="${index}">Remove Line</button>
      </details>
    `;
    cards?.appendChild(card);
  });
}

function renderSiteConditions() {
  const wrap = document.getElementById("siteConditions");
  if (!wrap) return;
  const selected = new Set(state.project.siteConditions || []);
  wrap.innerHTML = siteConditionOptions.map(option => `
    <label class="check-pill">
      <input type="checkbox" value="${escapeAttr(option)}" ${selected.has(option) ? "checked" : ""}>
      <span>${escapeHTML(option)}</span>
    </label>
  `).join("");
}

function renderSubItems() {
  const body = document.getElementById("subItems");
  if (!body) return;
  body.innerHTML = "";
  state.subs.forEach((sub, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><textarea class="short-textarea wide-input" data-sub-field="trade" data-index="${index}" rows="3" placeholder="Licensed electrician">${escapeHTML(sub.trade)}</textarea></td>
      <td><textarea class="short-textarea wide-input" data-sub-field="scope" data-index="${index}" rows="3" placeholder="Rough-in, fixture install...">${escapeHTML(sub.scope)}</textarea></td>
      <td><input data-sub-field="cost" data-index="${index}" type="number" min="0" step="25" value="${sub.cost}"></td>
      <td><button class="icon-button" type="button" data-remove-sub="${index}" aria-label="Remove subcontractor">x</button></td>
    `;
    body.appendChild(row);
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHTML(value).replaceAll("\n", " ");
}

function renderTotals() {
  const t = totals();
  document.getElementById("statTotal").textContent = money(t.totalQuote);
  document.getElementById("statBalance").textContent = money(t.balance);
  document.getElementById("mobileTotalQuote").textContent = money(t.totalQuote);
  document.getElementById("mobileDeposit").textContent = money(t.deposit);
  document.getElementById("mobileBalance").textContent = money(t.balance);
  document.getElementById("directCost").textContent = money(t.directCost);
  document.getElementById("markupCost").textContent = money(t.overheadCost + t.subMarkupCost + t.profitCost);
  document.getElementById("contingencyCost").textContent = money(t.contingencyCost);
  document.getElementById("taxCost").textContent = money(t.taxCost);
  document.getElementById("totalQuote").textContent = money(t.totalQuote);
  document.getElementById("reviewDeposit").textContent = money(t.deposit);
  document.getElementById("reviewBalance").textContent = money(t.balance);
  document.getElementById("quickTotalQuote").textContent = money(t.totalQuote);
  document.getElementById("quickDeposit").textContent = money(t.deposit);
  document.getElementById("quickBalance").textContent = money(t.balance);
  const margin = t.subtotal ? (t.profitCost / t.subtotal) * 100 : 0;
  document.getElementById("profitSummary").textContent = money(t.profitCost);
  document.getElementById("internalProfit").textContent = money(t.profitCost);
  document.getElementById("internalMargin").textContent = `${margin.toFixed(1)}%`;
  document.getElementById("internalProjectManagement").textContent = money(t.subMarkupCost + t.profitCost);
  document.getElementById("internalOverhead").textContent = money(t.overheadCost);
  document.getElementById("internalRisk").textContent = money(t.contingencyCost);
  document.getElementById("internalSubtotal").textContent = money(t.subtotal);
  document.getElementById("internalDannyPay").textContent = `${money(t.dannyPay)} (${t.dannyHours.toFixed(1)} hrs)`;
  document.getElementById("internalJulianPay").textContent = `${money(t.julianPay)} (${t.julianHours.toFixed(1)} hrs)`;
  document.getElementById("internalOwnerPay").textContent = money(t.ownerPayTotal);
}

function renderQuoteDocument() {
  const t = totals();
  const filledRows = state.lines.filter(line => line.area || line.description || numberValue(line.qty) || numberValue(line.marketRate) || numberValue(line.other));
  const rows = t.quickMode ? [] : (filledRows.length ? filledRows : [defaultLine()]);
  const printChangeOrders = printableChangeOrders();

  document.getElementById("quoteDocument").innerHTML = `
    <article class="quote-page cover-page">
      <div class="cover-inner">
        <img class="cover-logo" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
        <div class="cover-rule"></div>
        <p class="cover-kicker">Claybourne Home Renovation</p>
        <h1>Project Quote</h1>
        <div class="cover-meta">
          <div>
            <span>Prepared For</span>
            <strong>${escapeHTML(state.project.clientName || "Client Name")}</strong>
          </div>
          <div>
            <span>Project Address</span>
            <strong>${escapeHTML(state.project.projectAddress || "Project Address")}</strong>
          </div>
          <div>
            <span>Quote Number</span>
            <strong>${escapeHTML(state.settings.quoteNumber)}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>${escapeHTML(state.settings.quoteDate)}</strong>
          </div>
          <div>
            <span>Valid Until</span>
            <strong>${escapeHTML(state.settings.validUntil)}</strong>
          </div>
          <div>
            <span>Total Quote</span>
            <strong>${money(t.totalQuote)}</strong>
          </div>
        </div>
        <p class="cover-note">Thoughtful design. Expert craftsmanship. Built with integrity.</p>
      </div>
    </article>

    <article class="quote-page summary-page">
      <div class="print-header">
        <img class="quote-header" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
        <div class="print-document-title">Client Quote</div>
      </div>
      <div class="page-kicker">Quote Summary</div>
      <div class="doc-section-title">Client & Project Details</div>
      <div class="doc-grid">
        ${docPair("Client Name", state.project.clientName)}
        ${docPair("Phone", state.project.clientPhone)}
        ${docPair("Project Address", state.project.projectAddress)}
        ${docPair("Email", state.project.clientEmail)}
        ${docPair("Project Type", state.project.projectType)}
        ${docPair("Quote Valid Until", state.settings.validUntil)}
        ${docPair("Quote #", state.settings.quoteNumber)}
        ${docPair("Date", state.settings.quoteDate)}
      </div>

      <div class="amount-grid">
        <div class="amount-label">Initial Deposit (Materials)</div>
        <div class="amount-value">${money(t.materialDeposit)}</div>
        <div class="amount-label">Balance Due</div>
        <div class="amount-value">${money(t.balance)}</div>
      </div>

      <div class="doc-section-title">Scope Of Work</div>
      <div class="scope-box">${escapeHTML(state.project.scopeOfWork || "Scope to be confirmed based on final site review and selected finishes.")}</div>

      <div class="summary-hero">
        <div>
          <span>Total Quote</span>
          <strong>${money(t.totalQuote)}</strong>
        </div>
        <div>
          <span>Initial Deposit (Materials)</span>
          <strong>${money(t.materialDeposit)}</strong>
        </div>
        <div>
          <span>Balance Due</span>
          <strong>${money(t.balance)}</strong>
        </div>
      </div>

      <div class="doc-section-title">${t.quickMode ? "Project Cost Breakdown" : "Material Cost Breakdown"}</div>
      <table class="quote-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Area / Service</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Mat. / Unit</th>
            ${t.quickMode ? "<th>Labour</th>" : ""}
            <th>Other</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${t.quickMode ? quickQuoteRows(t) : rows.map((line, index) => quoteRow(line, index)).join("")}
        </tbody>
      </table>

      <div class="doc-section-title">Quote Summary</div>
      <div class="summary-grid">
        <div class="summary-note">This quote is based on the approved scope, visible site conditions, selected finishes, and assumptions listed in this package. Internal business allowances are included in the total and are not listed separately in the client package.</div>
        <div class="summary-label">Project Subtotal</div>
        <div>${money(t.subtotal)}</div>
        <div class="summary-label">HST (${numberValue(state.settings.taxRate)}%)</div>
        <div>${money(t.taxCost)}</div>
        ${printChangeOrders.length ? `<div class="summary-label">Approved Change Orders Included</div><div>${money(t.changeOrderDirect)}</div>` : ""}
        <div class="summary-label">Initial Deposit (Materials)</div>
        <div>${money(t.materialDeposit)}</div>
        <div class="summary-label">Balance Due</div>
        <div>${money(t.balance)}</div>
        <div class="summary-label summary-total">Total Quote</div>
        <div class="summary-total">${money(t.totalQuote)}</div>
      </div>

      <div class="page-fill-note">This quote is valid until ${escapeHTML(state.settings.validUntil)} and is based on the approved scope, visible site conditions, selected finishes, and assumptions listed in this package.</div>
    </article>

    <article class="quote-page detail-print-page">
      <div class="print-header compact-header">
        <img class="quote-header" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
        <div class="print-document-title">Client Quote</div>
      </div>
      <div class="page-kicker">Scope & Assumptions</div>
      <div class="doc-section-title">Scope Details</div>
      <div class="terms-grid">
        ${termBlock("Rooms / Areas", state.project.roomsAreas)}
        ${termBlock("Finishes / Quality", state.project.finishLevel)}
        ${termBlock("Included Work", state.project.includedWork)}
        ${termBlock("Excluded Work", state.project.excludedWork)}
      </div>

      <div class="doc-section-title">Site Conditions & Assumptions</div>
      <div class="terms-box">${escapeHTML(siteConditionSummary())}</div>

      <div class="doc-section-title">Payment, Change Order & Warranty Terms</div>
      <div class="terms-grid">
        ${termBlock("Timeline Estimate", state.project.timeline)}
        ${termBlock("Payment Schedule", paymentScheduleSummary(t))}
        ${termBlock("Subcontractors", subcontractorSummary())}
        ${termBlock("Change Orders", state.project.changeOrderTerms)}
        ${termBlock("Warranty", state.project.warrantyTerms)}
        ${termBlock("Client-Supplied Materials", state.project.clientMaterialTerms)}
        ${termBlock("Permits & Code", permitSummary())}
      </div>

      ${changeOrderPrintSection(printChangeOrders)}

      <div class="page-fill-note">Additional work outside the approved scope, concealed conditions, client-requested changes, or authority-required revisions must be approved before proceeding.</div>
    </article>

    <article class="quote-page approval-print-page">
      <div class="print-header compact-header">
        <img class="quote-header" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
        <div class="print-document-title">Client Quote</div>
      </div>
      <div class="page-kicker">Approval</div>
      <div class="approval-statement">
        <strong>Client Acceptance</strong>
        <span>By signing below, the client confirms that the scope, exclusions, assumptions, pricing, payment schedule, change order terms, warranty terms, and quote expiry have been reviewed and accepted.</span>
      </div>
      <div class="doc-section-title">Client Approval</div>
      <div class="approval-grid">
        ${docPair("Client Approval Signature", "____________________________")}
        ${docPair("Date", "____________________________")}
        ${docPair("Client Name", state.project.clientName || "____________________________")}
        ${docPair("Prepared By", state.settings.preparedBy || "Claybourne Home Renovation")}
        ${docPair("Special Conditions", state.project.specialConditions || "____________________________")}
        ${docPair("", "____________________________")}
      </div>

      <div class="approval-notes">
        <div>
          <strong>Quote Expiry</strong>
          <span>This quote is valid until ${escapeHTML(state.settings.validUntil)}. Material pricing, supplier availability, and scheduling may change after expiry.</span>
        </div>
        <div>
          <strong>Concealed Conditions</strong>
          <span>Hidden damage, mold, rot, structural concerns, code deficiencies, or issues discovered after demolition are not included unless specifically stated.</span>
        </div>
        <div>
          <strong>Change Orders</strong>
          <span>Any work outside the approved scope must be priced and approved before proceeding.</span>
        </div>
      </div>
    </article>
  `;
}

function docPair(label, value) {
  return `<div class="doc-label">${escapeHTML(label)}</div><div>${escapeHTML(value || "")}</div>`;
}

function paymentScheduleSummary(t) {
  const materialLine = `Initial material deposit due upfront: ${money(t.materialDeposit)}. This covers the calculated material cost before materials are ordered.`;
  const schedule = (state.project.paymentSchedule || "").trim();
  return schedule ? `${materialLine}\n\n${schedule}` : materialLine;
}

function termBlock(label, value) {
  return `
    <div class="term-block">
      <strong>${escapeHTML(label)}</strong>
      <span>${escapeHTML(value || "Not included unless specifically stated in approved scope.")}</span>
    </div>
  `;
}

function printableChangeOrders() {
  return state.changeOrders.filter(order => {
    return order.description
      || numberValue(order.labourHours)
      || numberValue(order.materials)
      || numberValue(order.subcontractor)
      || numberValue(order.other);
  });
}

function changeOrderAmount(order) {
  return (numberValue(order.labourHours) * numberValue(state.settings.hourlyRate))
    + numberValue(order.materials)
    + numberValue(order.subcontractor)
    + numberValue(order.other);
}

function changeOrderPrintSection(orders) {
  if (!orders.length) return "";
  return `
    <div class="doc-section-title">Approved Change Orders</div>
    <table class="quote-table change-order-print-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Approval Date</th>
          <th>Labour</th>
          <th>Materials</th>
          <th>Trades / Other</th>
          <th>Added Total</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map((order, index) => {
          const tradeOther = numberValue(order.subcontractor) + numberValue(order.other);
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHTML(order.description || "Approved change order")}</td>
              <td>${escapeHTML(order.approvalDate || "")}</td>
              <td>${money(numberValue(order.labourHours) * numberValue(state.settings.hourlyRate))}</td>
              <td>${money(numberValue(order.materials))}</td>
              <td>${money(tradeOther)}</td>
              <td>${money(changeOrderAmount(order))}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
    <div class="terms-box change-order-note">Approved change orders are added to the quote subtotal before HST. They explain approved extra work or cost changes beyond the original quoted scope.</div>
  `;
}

function siteConditionSummary() {
  const selected = state.project.siteConditions?.length ? state.project.siteConditions.join(", ") : "No unusual site conditions selected.";
  const notes = state.project.siteNotes ? ` Notes: ${state.project.siteNotes}` : "";
  return `${selected}.${notes} Quote does not include repair of hidden water damage, mold remediation, structural repairs, concealed code deficiencies, or conditions discovered after demolition unless specifically stated.`;
}

function permitSummary() {
  const allowance = numberValue(state.costs.permitCost) > 0 ? `Permit/drawing allowance included: ${money(state.costs.permitCost)}.` : "Permit fees, drawings, engineering, and inspection-related changes are not included unless specifically stated.";
  return `${allowance} Any inspection, code, or authority-required change outside the approved scope may require a written change order.`;
}

function subcontractorSummary() {
  const filled = state.subs.filter(sub => sub.trade || sub.scope || numberValue(sub.cost));
  if (!filled.length) return "No subcontractor allowance included unless specifically stated. Licensed trade work may require a revised quote based on site conditions.";
  const list = filled.map(sub => `${sub.trade || "Trade"}: ${sub.scope || "scope allowance"} (${money(sub.cost)})`).join("; ");
  return `${list}. Subcontractor pricing, availability, and site-condition changes may affect the final price and schedule. Coordination is included only as stated in this quote.`;
}

function quoteRow(line, index) {
  const cost = lineCost(line);
  const description = [line.description, line.material !== "Custom material" ? line.material : "", line.quality].filter(Boolean).join(" / ");
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHTML(line.area)}</td>
      <td>${escapeHTML(description)}</td>
      <td>${numberValue(line.qty)}</td>
      <td>${money(numberValue(line.marketRate))}</td>
      <td>${money(numberValue(line.other) - cost.savingsAmount)}</td>
      <td>${money(cost.lineTotal)}</td>
    </tr>
  `;
}

function quickQuoteRows(t) {
  return `
    <tr>
      <td>1</td>
      <td>${escapeHTML(state.project.projectType)}</td>
      <td>${escapeHTML(`${numberValue(state.costs.quickWorkers)} worker(s) x ${numberValue(state.costs.quickDays)} day(s) x ${numberValue(state.costs.quickHoursPerDay)} hr/day`)}</td>
      <td>${numberValue(state.costs.quickWorkers)}</td>
      <td>${money(numberValue(state.costs.quickMaterialCost))}</td>
      <td>${money(t.labourCost)}</td>
      <td>${money(numberValue(state.costs.quickOtherCost))}</td>
      <td>${money(t.directBeforeMinimum)}</td>
    </tr>
  `;
}

function readinessItems() {
  const t = totals();
  const hasDetailedCost = t.quickMode || state.lines.some(line => numberValue(line.marketRate) || numberValue(line.other));
  const hasPaymentSchedule = Boolean((state.project.paymentSchedule || "").trim());
  const checks = [
    { label: "Client name added", ok: Boolean((state.project.clientName || "").trim()), step: "start", selector: "#clientName" },
    { label: "Project address added", ok: Boolean((state.project.projectAddress || "").trim()), step: "start", selector: "#projectAddress" },
    { label: "Scope of work completed", ok: Boolean((state.project.scopeOfWork || "").trim()), step: "start", selector: "#scopeOfWork" },
    { label: "Timeline added", ok: Boolean((state.project.timeline || "").trim()), step: "start", selector: "#timeline" },
    { label: "Payment schedule reviewed", ok: hasPaymentSchedule, step: "pricing", selector: "#paymentSchedule" },
    { label: "Total quote calculated", ok: t.totalQuote > 0 && hasDetailedCost, step: "pricing", selector: t.quickMode ? "#quickWorkers" : "#lineItemCards" },
    { label: "Internal profit checked", ok: t.profitCost > 0, step: "review", selector: ".profit-panel" },
    { label: "Client terms reviewed", ok: Boolean((state.project.changeOrderTerms || "").trim() && (state.project.warrantyTerms || "").trim()), step: "pricing", selector: "#changeOrderTerms" }
  ];
  return checks;
}

function warningTarget(warning) {
  const targets = {
    "Missing Client Email": { step: "start", selector: "#clientEmail" },
    "Scope Needs Review": { step: "start", selector: "#scopeOfWork" },
    "No Payment Schedule Added": { step: "pricing", selector: "#paymentSchedule" },
    "Deposit Exceeds Quote Total": { step: "pricing", selector: "#depositPaid" },
    "Labour hours are zero": { step: "pricing", selector: totals().quickMode ? "#quickWorkers" : "#prepHours" },
    "Material allowance is zero on a remodel": { step: "pricing", selector: "#quickMaterialCost" },
    "Profit rate is below target": { step: "pricing", selector: "#profitRate" },
    "HST changed from 13%": { step: "pricing", selector: "#taxRate" },
    "Risk buffer is zero": { step: "pricing", selector: "#contingencyRate" },
    "Client-supplied materials selected while material markup is still set": { step: "pricing", selector: "#materialSupply" },
    "Project has subcontractors but no trade coordination fee": { step: "pricing", selector: "#subMarkupRate" }
  };
  return targets[warning] || { step: "review", selector: "#readinessChecklist" };
}

function quoteWarnings() {
  const t = totals();
  const warnings = [];
  if (!state.project.clientEmail) warnings.push("Missing Client Email");
  if (!state.project.scopeOfWork) warnings.push("Scope Needs Review");
  if (!state.project.paymentSchedule) warnings.push("No Payment Schedule Added");
  if (numberValue(state.settings.depositPaid) > t.totalQuote) warnings.push("Deposit Exceeds Quote Total");
  if (t.totalWorkerHours <= 0) warnings.push("Labour hours are zero");
  if (state.project.projectType !== "Handyman Job" && numberValue(state.costs.quickMaterialCost) <= 0 && t.quickMode) warnings.push("Material allowance is zero on a remodel");
  if (numberValue(state.settings.profitRate) < 15) warnings.push("Profit rate is below target");
  if (numberValue(state.settings.taxRate) !== 13) warnings.push("HST changed from 13%");
  if (t.contingencyCost <= 0) warnings.push("Risk buffer is zero");
  if (state.project.materialSupply === "Client supplied" && numberValue(state.settings.materialMarkupRate) > 0) warnings.push("Client-supplied materials selected while material markup is still set");
  if (state.subs.some(sub => numberValue(sub.cost) > 0) && numberValue(state.settings.subMarkupRate) <= 0) warnings.push("Project has subcontractors but no trade coordination fee");
  return warnings;
}

function renderReadiness() {
  const checklist = document.getElementById("readinessChecklist");
  const warningList = document.getElementById("quoteWarnings");
  const title = document.getElementById("readinessTitle");
  const status = document.getElementById("readinessStatus");
  if (!checklist || !warningList || !title || !status) return;
  const checks = readinessItems();
  const warnings = quoteWarnings();
  const ready = checks.every(item => item.ok) && !warnings.includes("Deposit Exceeds Quote Total");
  title.textContent = ready ? "Ready to Print" : "Needs Review";
  status.textContent = ready ? "Ready to Print" : `${warnings[0] || "Missing required details"}`;
  status.classList.toggle("is-ready", ready);
  checklist.innerHTML = checks.map(item => `
    <button class="readiness-item ${item.ok ? "is-complete" : ""}" type="button" data-step-target="${escapeAttr(item.step)}" data-focus-target="${escapeAttr(item.selector)}">
      <span>${item.ok ? "OK" : "!"}</span>
      <strong>${escapeHTML(item.label)}</strong>
    </button>
  `).join("");
  warningList.innerHTML = warnings.length
    ? warnings.map(warning => {
      const target = warningTarget(warning);
      return `<button type="button" data-step-target="${escapeAttr(target.step)}" data-focus-target="${escapeAttr(target.selector)}">${escapeHTML(warning)}</button>`;
    }).join("")
    : `<div class="is-clear">No risky inputs detected.</div>`;
}

function renderPayments() {
  const wrap = document.getElementById("paymentItems");
  if (!wrap) return;
  const t = totals();
  const openIndex = state.payments.findIndex(payment => !numberValue(payment.amount) && !payment.note);
  renderPaymentDraftMenu();
  wrap.innerHTML = `
    <div class="payment-summary">
      <div><span>Cash received</span><strong>${money(t.trackedPayments)}</strong></div>
      <div><span>Remaining</span><strong>${money(t.balance)}</strong></div>
    </div>
    ${state.payments.length ? state.payments.map((payment, index) => `
      <details class="payment-card ledger-card" ${index === openIndex ? "open" : ""}>
        <summary>
          <span><strong>${escapeHTML(payment.type || "Payment")}</strong><small>${escapeHTML(payment.date || "No date")} | ${escapeHTML(payment.method || "Method not set")}</small></span>
          <b>${money(paymentSignedAmount(payment))}</b>
          <button class="icon-button" type="button" data-remove-payment="${index}" aria-label="Remove payment">x</button>
        </summary>
        <div class="ledger-card-body">
          <label>Payment date
            <input data-payment-field="date" data-index="${index}" type="date" value="${escapeAttr(payment.date)}">
          </label>
          <label>Payment type
            <select data-payment-field="type" data-index="${index}">
              ${["Deposit", "Progress payment", "Final payment", "Refund", "Discount adjustment", "Credit", "Late fee"].map(type => `<option ${payment.type === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          <label>Payment method
            <select data-payment-field="method" data-index="${index}">
              ${["E-transfer", "Cash", "Cheque", "Debit", "Credit card", "Bank transfer", "Other"].map(method => `<option ${payment.method === method ? "selected" : ""}>${method}</option>`).join("")}
            </select>
          </label>
          <label>Payment amount
            <input data-payment-field="amount" data-index="${index}" type="number" min="0" step="25" value="${numberValue(payment.amount)}">
          </label>
          <label>Payment note
            <input data-payment-field="note" data-index="${index}" value="${escapeAttr(payment.note)}" placeholder="Deposit, progress payment...">
          </label>
        </div>
      </details>
    `).join("") : `<div class="empty-state">No client payments recorded yet.</div>`}
  `;
}

function renderExpenses() {
  const wrap = document.getElementById("expenseItems");
  if (!wrap) return;
  const openIndex = state.expenses.findIndex(expense => !numberValue(expense.amount) && !expense.note);
  renderExpenseDraftMenu();
  wrap.innerHTML = `
    <div class="payment-summary">
      <div><span>Current job costs</span><strong>${money(actualExpenseTotal())}</strong></div>
      <div><span>Expense entries</span><strong>${state.expenses.length}</strong></div>
    </div>
    ${state.expenses.length ? state.expenses.map((expense, index) => `
      <details class="payment-card ledger-card" ${index === openIndex ? "open" : ""}>
        <summary>
          <span><strong>${escapeHTML(expense.vendor || expense.category || "Expense")}</strong><small>${escapeHTML(expense.date || "No date")} | ${escapeHTML(expense.category || "Category not set")}</small></span>
          <b>${money(numberValue(expense.amount))}</b>
          <button class="icon-button" type="button" data-remove-expense="${index}" aria-label="Remove expense">x</button>
        </summary>
        <div class="ledger-card-body">
          <label>Expense date
            <input data-expense-field="date" data-index="${index}" type="date" value="${escapeAttr(expense.date)}">
          </label>
          <label>Expense category
            <select data-expense-field="category" data-index="${index}">
              ${["Materials", "Subcontractors", "Disposal", "Fuel", "Miscellaneous"].map(category => `<option ${expense.category === category ? "selected" : ""}>${category}</option>`).join("")}
            </select>
          </label>
          <label>Vendor
            <input data-expense-field="vendor" data-index="${index}" value="${escapeAttr(expense.vendor)}" placeholder="Home Depot, Shell...">
          </label>
          <label>Expense amount
            <input data-expense-field="amount" data-index="${index}" type="number" min="0" step="0.01" value="${numberValue(expense.amount)}">
          </label>
          <label>Expense notes
            <input data-expense-field="note" data-index="${index}" value="${escapeAttr(expense.note)}" placeholder="Tile, bin rental, fuel...">
          </label>
        </div>
      </details>
    `).join("") : `<div class="empty-state">No job expenses recorded yet.</div>`}
  `;
}

function renderPaymentDraftMenu() {
  const wrap = document.getElementById("paymentCreateMenu");
  if (!wrap) return;
  const payment = accountingDrafts.payment;
  wrap.innerHTML = payment ? `
    <div class="ops-create-menu accounting-create-menu">
      <label>Payment date
        <input data-accounting-draft="payment" data-accounting-draft-field="date" type="date" value="${escapeAttr(payment.date)}">
      </label>
      <label>Payment type
        <select data-accounting-draft="payment" data-accounting-draft-field="type">
          ${["Deposit", "Progress payment", "Final payment", "Refund", "Discount adjustment", "Credit", "Late fee"].map(type => `<option ${payment.type === type ? "selected" : ""}>${type}</option>`).join("")}
        </select>
      </label>
      <label>Payment method
        <select data-accounting-draft="payment" data-accounting-draft-field="method">
          ${["E-transfer", "Cash", "Cheque", "Debit", "Credit card", "Bank transfer", "Other"].map(method => `<option ${payment.method === method ? "selected" : ""}>${method}</option>`).join("")}
        </select>
      </label>
      <label>Payment amount
        <input data-accounting-draft="payment" data-accounting-draft-field="amount" type="number" min="0" step="25" value="${numberValue(payment.amount)}">
      </label>
      <label>Payment note
        <input data-accounting-draft="payment" data-accounting-draft-field="note" value="${escapeAttr(payment.note)}" placeholder="Deposit, progress payment...">
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-accounting-draft="payment">Add Payment</button>
        <button class="ghost-button" type="button" data-cancel-accounting-draft="payment">Cancel</button>
      </div>
    </div>
  ` : "";
}

function renderExpenseDraftMenu() {
  const wrap = document.getElementById("expenseCreateMenu");
  if (!wrap) return;
  const expense = accountingDrafts.expense;
  wrap.innerHTML = expense ? `
    <div class="ops-create-menu accounting-create-menu">
      <label>Expense date
        <input data-accounting-draft="expense" data-accounting-draft-field="date" type="date" value="${escapeAttr(expense.date)}">
      </label>
      <label>Expense category
        <select data-accounting-draft="expense" data-accounting-draft-field="category">
          ${["Materials", "Subcontractors", "Disposal", "Fuel", "Miscellaneous"].map(category => `<option ${expense.category === category ? "selected" : ""}>${category}</option>`).join("")}
        </select>
      </label>
      <label>Vendor
        <input data-accounting-draft="expense" data-accounting-draft-field="vendor" value="${escapeAttr(expense.vendor)}" placeholder="Home Depot, Shell...">
      </label>
      <label>Expense amount
        <input data-accounting-draft="expense" data-accounting-draft-field="amount" type="number" min="0" step="0.01" value="${numberValue(expense.amount)}">
      </label>
      <label>Expense notes
        <input data-accounting-draft="expense" data-accounting-draft-field="note" value="${escapeAttr(expense.note)}" placeholder="Tile, bin rental, fuel...">
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-accounting-draft="expense">Add Expense</button>
        <button class="ghost-button" type="button" data-cancel-accounting-draft="expense">Cancel</button>
      </div>
    </div>
  ` : "";
}

function renderChangeOrders() {
  const wrap = document.getElementById("changeOrderItems");
  if (!wrap) return;
  wrap.innerHTML = state.changeOrders.length ? state.changeOrders.map((order, index) => {
    const added = (numberValue(order.labourHours) * numberValue(state.settings.hourlyRate)) + numberValue(order.materials) + numberValue(order.subcontractor) + numberValue(order.other);
    const tax = added * numberValue(state.settings.taxRate) / 100;
    return `
      <article class="payment-card change-order-card">
        <label>Description
          <textarea class="short-textarea" data-change-field="description" data-index="${index}" rows="3" placeholder="Extra tile niche, added repair...">${escapeHTML(order.description)}</textarea>
        </label>
        <label>Added labour hours
          <input data-change-field="labourHours" data-index="${index}" type="number" min="0" step="0.25" value="${numberValue(order.labourHours)}">
        </label>
        <label>Added materials
          <input data-change-field="materials" data-index="${index}" type="number" min="0" step="25" value="${numberValue(order.materials)}">
        </label>
        <label>Added subcontractor cost
          <input data-change-field="subcontractor" data-index="${index}" type="number" min="0" step="25" value="${numberValue(order.subcontractor)}">
        </label>
        <label>Status
          <select data-change-field="status" data-index="${index}">
            ${["Pending approval", "Approved", "Completed"].map(status => `<option ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label>Other
          <input data-change-field="other" data-index="${index}" type="number" min="0" step="25" value="${numberValue(order.other)}">
        </label>
        <label>Client approval date
          <input data-change-field="approvalDate" data-index="${index}" type="date" value="${escapeAttr(order.approvalDate)}">
        </label>
        <div class="change-order-total">
          <span>Added total</span>
          <strong>${money(added + tax)}</strong>
        </div>
        <button class="icon-button" type="button" data-remove-change="${index}" aria-label="Remove change order">x</button>
      </article>
    `;
  }).join("") : `<div class="empty-state">No change orders added yet.</div>`;
}

function jobHealth(margin) {
  if (margin >= 30) return { label: "Healthy", note: "Profit margin is strong.", className: "is-ready" };
  if (margin >= 18) return { label: "Tight", note: "Profit is lower than ideal.", className: "is-tight" };
  if (margin >= 8) return { label: "At Risk", note: "Costs are too close to revenue.", className: "is-risk" };
  return { label: "Loss Risk", note: "Job may lose money.", className: "is-loss" };
}

function balanceStatus(a) {
  if (a.cashReceived <= 0 && a.totalQuote > 0) return { label: "Awaiting deposit", className: "is-risk" };
  if (a.trackedPayments > 0 && a.balance <= 0) return { label: "Paid in full", className: "is-ready" };
  if (state.payments.some(payment => payment.type === "Refund")) return { label: "Refund pending", className: "is-tight" };
  if (a.cashReceived > 0 && a.balance > 0) return { label: "Partially paid", className: "is-tight" };
  return { label: "Deposit received", className: "is-ready" };
}

function financialAlerts(a) {
  const alerts = [];
  if (!state.payments.length) alerts.push({ label: "No payment received", target: "payments" });
  if (!state.expenses.length) alerts.push({ label: "No expenses recorded", target: "expenses" });
  if (a.outstandingReceivables > 0) alerts.push({ label: "Large balance still outstanding", target: "payments" });
  if (a.actualCosts > a.totalJobCost && a.totalJobCost > 0) alerts.push({ label: "Expenses exceed estimated cost", target: "expenses" });
  if (!state.payments.some(payment => payment.type === "Deposit" && paymentSignedAmount(payment) > 0)) {
    alerts.push({ label: "No deposit recorded", target: "payments" });
  }
  return alerts;
}

function accountingRow(label, value, strong = false) {
  return `
    <div class="${strong ? "accounting-row is-strong" : "accounting-row"}">
      <span>${escapeHTML(label)}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function renderAccounting() {
  const cards = document.getElementById("accountingCards");
  const revenue = document.getElementById("revenueBreakdown");
  const costs = document.getElementById("costBreakdown");
  const profit = document.getElementById("profitBreakdown");
  const healthStatus = document.getElementById("jobHealthStatus");
  const balanceEl = document.getElementById("balanceStatus");
  const alerts = document.getElementById("financialAlerts");
  if (!cards || !revenue || !costs || !profit || !healthStatus || !balanceEl || !alerts) return;

  const a = accountingBreakdown();
  const health = jobHealth(a.margin);
  const status = balanceStatus(a);
  healthStatus.textContent = `${health.label} - ${health.note}`;
  healthStatus.className = `status-pill ${health.className}`;
  balanceEl.innerHTML = `<span class="status-pill ${status.className}">${status.label}</span><strong>${money(a.outstandingReceivables)} outstanding</strong>`;
  const alertItems = financialAlerts(a);
  alerts.innerHTML = alertItems.length
    ? alertItems.map(alert => `<button type="button" data-accounting-alert="${escapeAttr(alert.target)}">${escapeHTML(alert.label)}</button>`).join("")
    : `<div class="is-clear">No money movement warnings right now.</div>`;

  cards.innerHTML = `
    <div><span>Cash Received</span><strong>${money(a.cashReceived)}</strong><small>Actual money in</small></div>
    <div><span>Outstanding Receivables</span><strong>${money(a.outstandingReceivables)}</strong><small>Still owed by client</small></div>
    <div><span>Current Job Costs</span><strong>${money(a.actualCosts)}</strong><small>Recorded expenses</small></div>
    <div><span>Actual Profit</span><strong>${money(a.actualProfit)}</strong><small>Cash received minus expenses</small></div>
  `;

  revenue.innerHTML = [
    accountingRow("Quote subtotal", money(a.subtotal)),
    accountingRow("HST collected", money(a.taxCost)),
    accountingRow("Total invoice value", money(a.totalQuote), true),
    accountingRow("Deposit paid", money(a.depositPaidInput)),
    accountingRow("Payments received", money(a.trackedPayments)),
    accountingRow("Balance due", money(a.balance), true)
  ].join("");

  costs.innerHTML = [
    accountingRow("Materials", money(a.materialActual)),
    accountingRow("Labour / owner pay", money(a.ownerLabour)),
    accountingRow("Subcontractors", money(a.subCost)),
    accountingRow("Permits", money(a.permitCost)),
    accountingRow("Disposal", money(a.disposalCost)),
    accountingRow("Protection / cleanup", money(a.protectionCost)),
    accountingRow("Miscellaneous", money(a.miscellaneousCost)),
    accountingRow("Payment processing fees", money(a.paymentProcessingFees)),
    a.changeOrderDirect ? accountingRow("Approved change orders", money(a.changeOrderDirect)) : "",
    accountingRow("Total costs", money(a.totalJobCost), true)
  ].join("");

  profit.innerHTML = [
    accountingRow("Revenue before tax", money(a.subtotal)),
    accountingRow("Total costs", money(a.totalJobCost)),
    accountingRow("Gross profit", money(a.grossProfit), true),
    accountingRow("Profit margin", `${a.margin.toFixed(1)}%`, true),
    accountingRow("Owner pay", money(a.ownerPayTotal)),
    accountingRow("Company profit retained", money(a.companyProfitRetained), true)
  ].join("");
}

function renderTimeline() {
  const wrap = document.getElementById("financialTimeline");
  if (!wrap) return;
  const events = [
    { date: state.settings.quoteDate || todayISO(), label: "Quote created", amount: money(totals().totalQuote), kind: "quote" },
    ...state.payments.map(payment => ({
      date: payment.date,
      label: `${payment.type || "Payment"} received - ${payment.method || "Method not set"}`,
      amount: money(paymentSignedAmount(payment)),
      note: payment.note,
      kind: "payment"
    })),
    ...state.expenses.map(expense => ({
      date: expense.date,
      label: `${expense.category || "Expense"} - ${expense.vendor || "Vendor not set"}`,
      amount: money(numberValue(expense.amount)),
      note: expense.note,
      kind: "expense"
    }))
  ].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  wrap.innerHTML = events.map(event => `
    <article class="timeline-item ${event.kind}">
      <span>${escapeHTML(event.date || "")}</span>
      <strong>${escapeHTML(event.label)}</strong>
      <b>${escapeHTML(event.amount)}</b>
      ${event.note ? `<small>${escapeHTML(event.note)}</small>` : ""}
    </article>
  `).join("");
}

function daysUntil(dateValue) {
  const today = new Date(todayISO());
  const due = new Date(dateValue || todayISO());
  return Math.ceil((due - today) / 86400000);
}

function renderJobDashboard() {
  const title = document.getElementById("jobDashboardTitle");
  const status = document.getElementById("dashboardStatus");
  const cards = document.getElementById("jobDashboardCards");
  if (!title || !status || !cards) return;
  const a = accountingBreakdown();
  title.textContent = state.project.clientName || "Current Quote";
  status.textContent = state.project.jobStatus || "Draft";
  cards.innerHTML = `
    <div><span>Total Quote</span><strong>${money(a.totalQuote)}</strong><small>Client package value</small></div>
    <div><span>Initial Deposit (Materials)</span><strong>${money(a.materialDeposit)}</strong><small>Total material cost due upfront</small></div>
    <div><span>Balance Due</span><strong>${money(a.balance)}</strong><small>Remaining quote balance</small></div>
    <div><span>Valid Until</span><strong>${escapeHTML(state.settings.validUntil || "Not set")}</strong><small>Quote expiry date</small></div>
  `;
  renderDashboardJobSelect();
  renderActiveJobCards();
  renderReminders();
  renderDashboardDraftMenus();
  renderTasks();
  renderSiteLogs();
  renderPhotos();
  autoGrowAllTextareas();
}

function renderDashboardDraftMenus() {
  renderTaskDraftMenu();
  renderMaterialDraftMenu();
  renderSiteLogDraftMenu();
  renderCommunicationDraftMenu();
}

function renderTaskDraftMenu() {
  const wrap = document.getElementById("taskCreateMenu");
  if (!wrap) return;
  const task = dashboardDrafts.task;
  wrap.innerHTML = task ? `
    <div class="ops-create-menu">
      <label>Task status
        <select data-draft="task" data-draft-field="status">
          ${["Pending", "In Progress", "Waiting", "Complete"].map(status => `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </label>
      <label>Task name
        <textarea data-draft="task" data-draft-field="task" placeholder="Pick up tile">${escapeHTML(task.task)}</textarea>
      </label>
      <label>Assigned to
        <input data-draft="task" data-draft-field="assignedTo" value="${escapeAttr(task.assignedTo)}" placeholder="Danny">
      </label>
      <label>Assigned date
        <input data-draft="task" data-draft-field="startDate" type="date" value="${escapeAttr(task.startDate)}">
      </label>
      <label>Due date
        <input data-draft="task" data-draft-field="dueDate" type="date" value="${escapeAttr(task.dueDate)}">
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-draft="task">Add Task</button>
        <button class="ghost-button" type="button" data-cancel-draft="task">Cancel</button>
      </div>
    </div>
  ` : "";
}

function renderMaterialDraftMenu() {
  const wrap = document.getElementById("materialCreateMenu");
  if (!wrap) return;
  const item = dashboardDrafts.material;
  wrap.innerHTML = item ? `
    <div class="ops-create-menu">
      <label>Material name
        <input data-draft="material" data-draft-field="item" value="${escapeAttr(item.item)}" placeholder="Vanity, tile, grout...">
      </label>
      <label>Material status
        <select data-draft="material" data-draft-field="status">
          ${["Ordered", "Picked up", "Delivered", "Installed", "Backordered", "Pickup pending"].map(status => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </label>
      <label>Supplier
        <input data-draft="material" data-draft-field="supplier" value="${escapeAttr(item.supplier)}" placeholder="Home Depot, RONA...">
      </label>
      <label>Needed by date
        <input data-draft="material" data-draft-field="neededBy" type="date" value="${escapeAttr(item.neededBy)}">
      </label>
      <label>Material note
        <textarea data-draft="material" data-draft-field="note" placeholder="Pickup aisle, colour, size...">${escapeHTML(item.note)}</textarea>
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-draft="material">Add Material</button>
        <button class="ghost-button" type="button" data-cancel-draft="material">Cancel</button>
      </div>
    </div>
  ` : "";
}

function renderSiteLogDraftMenu() {
  const wrap = document.getElementById("siteLogCreateMenu");
  if (!wrap) return;
  const item = dashboardDrafts.siteLog;
  wrap.innerHTML = item ? `
    <div class="ops-create-menu">
      <label>Note date
        <input data-draft="siteLog" data-draft-field="date" type="date" value="${escapeAttr(item.date)}">
      </label>
      <label>Site note
        <textarea data-draft="siteLog" data-draft-field="note" placeholder="Client requested matte black faucet">${escapeHTML(item.note)}</textarea>
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-draft="siteLog">Add Note</button>
        <button class="ghost-button" type="button" data-cancel-draft="siteLog">Cancel</button>
      </div>
    </div>
  ` : "";
}

function renderCommunicationDraftMenu() {
  const wrap = document.getElementById("communicationCreateMenu");
  if (!wrap) return;
  const item = dashboardDrafts.communication;
  wrap.innerHTML = item ? `
    <div class="ops-create-menu">
      <label>Communication date
        <input data-draft="communication" data-draft-field="date" type="date" value="${escapeAttr(item.date)}">
      </label>
      <label>Communication type
        <select data-draft="communication" data-draft-field="type">
          ${["Call", "Email", "Text", "Approval", "Site discussion"].map(type => `<option ${item.type === type ? "selected" : ""}>${type}</option>`).join("")}
        </select>
      </label>
      <label>Communication note
        <input data-draft="communication" data-draft-field="note" value="${escapeAttr(item.note)}" placeholder="Client approved vanity by text">
      </label>
      <div class="ops-create-actions">
        <button class="secondary-button" type="button" data-add-draft="communication">Add Log</button>
        <button class="ghost-button" type="button" data-cancel-draft="communication">Cancel</button>
      </div>
    </div>
  ` : "";
}

function activeJobEntries() {
  const activeStatuses = ["Draft", "Sent", "Follow-up needed", "Approved", "Deposit paid", "In progress", "Balance due"];
  return archiveEntries()
    .filter(entry => activeStatuses.includes(entry.status || entry.snapshot?.project?.jobStatus || "Draft"))
    .sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")));
}

function renderDashboardJobSelect() {
  const select = document.getElementById("dashboardJobSelect");
  if (!select) return;
  const currentLabel = `${state.project.clientName || "Current quote"} - ${state.project.projectType || "Project"} - ${money(totals().totalQuote)}`;
  const currentId = state.meta.archiveId || "";
  const entries = activeJobEntries().filter(entry => !currentId || entry.id !== currentId);
  select.innerHTML = `
    <option value="__current__">${escapeHTML(currentLabel)} (open now)</option>
    ${entries.map(entry => {
      const selected = currentId && entry.id === currentId ? "selected" : "";
      const label = `${entry.clientName || "Unnamed Client"} - ${entry.projectType || "Project"} - ${entry.status || "Draft"} - ${money(entry.totalQuote)}`;
      return `<option value="${escapeAttr(entry.id)}" ${selected}>${escapeHTML(label)}</option>`;
    }).join("")}
  `;
  renderDashboardJobPreview();
}

function activeJobCard(entry, isCurrent = false) {
  const snapshot = entry.snapshot || state;
  const project = snapshot.project || {};
  const settings = snapshot.settings || {};
  const total = isCurrent ? totals().totalQuote : numberValue(entry.totalQuote);
  const status = isCurrent ? state.project.jobStatus : (entry.status || project.jobStatus || "Draft");
  const client = project.clientName || entry.clientName || "Unnamed Client";
  const address = project.projectAddress || entry.projectAddress || "";
  const type = project.projectType || entry.projectType || "Project";
  const id = isCurrent ? "__current__" : entry.id;
  return `
    <button class="active-job-card ${isCurrent ? "is-current" : ""}" type="button" data-open-dashboard-job="${escapeAttr(id)}">
      <span>${escapeHTML(status)}</span>
      <strong>${escapeHTML(client)}</strong>
      <small>${escapeHTML(type)}${address ? ` | ${escapeHTML(address)}` : ""}</small>
      <b>${money(total)}</b>
      <em>Valid until ${escapeHTML(settings.validUntil || state.settings.validUntil || "not set")}</em>
    </button>
  `;
}

function renderActiveJobCards() {
  const wrap = document.getElementById("activeJobCards");
  if (!wrap) return;
  const currentId = state.meta.archiveId || "";
  const entries = activeJobEntries().filter(entry => !currentId || entry.id !== currentId).slice(0, 4);
  wrap.innerHTML = [
    activeJobCard({ snapshot: state }, true),
    ...entries.map(entry => activeJobCard(entry))
  ].join("");
}

function renderDashboardJobPreview() {
  const preview = document.getElementById("dashboardJobPreview");
  const select = document.getElementById("dashboardJobSelect");
  if (!preview || !select) return;
  const selected = select.value;
  const entry = selected === "__current__" ? { snapshot: state } : activeJobEntries().find(item => item.id === selected);
  if (!entry) {
    preview.innerHTML = "";
    return;
  }
  const snapshot = entry.snapshot || state;
  const project = snapshot.project || {};
  const settings = snapshot.settings || {};
  const total = selected === "__current__" ? totals().totalQuote : numberValue(entry.totalQuote);
  preview.innerHTML = `
    <div>
      <span>${escapeHTML(project.jobStatus || entry.status || "Draft")}</span>
      <strong>${escapeHTML(project.clientName || entry.clientName || "Current quote")}</strong>
      <small>${escapeHTML(project.projectType || entry.projectType || "Project")} | ${escapeHTML(project.projectAddress || entry.projectAddress || "No address")}</small>
    </div>
    <b>${money(total)}</b>
    <small>Valid until ${escapeHTML(settings.validUntil || "not set")}</small>
  `;
}

function openDashboardJob() {
  const select = document.getElementById("dashboardJobSelect");
  const id = select?.value;
  if (!id || id === "__current__" || id === state.meta.archiveId) return;
  if (state.meta.dirty) archiveCurrentQuote(state.project.jobStatus || "Draft");
  loadArchivedQuote(id);
  activeStep = "dashboard";
  renderFlow();
}

function isSnoozed(task) {
  return task.snoozedUntil && daysUntil(task.snoozedUntil) > 0;
}

function dueReminderItems() {
  return state.tasks
    .map((task, index) => ({ ...task, index, delta: daysUntil(task.dueDate) }))
    .filter(task => task.status !== "Complete" && !task.silenced && !isSnoozed(task) && task.delta <= 2)
    .sort((a, b) => a.delta - b.delta);
}

function renderReminders() {
  const wrap = document.getElementById("dashboardReminders");
  if (!wrap) return;
  const reminders = dueReminderItems();
  wrap.innerHTML = reminders.length ? reminders.map(task => {
    const label = task.delta < 0 ? `${Math.abs(task.delta)} day(s) overdue` : task.delta === 0 ? "Due today" : `Due in ${task.delta} day(s)`;
    return `
      <article class="timeline-item reminder-item ${task.delta < 0 ? "expense" : "payment"}">
        <span>${escapeHTML(task.dueDate || "")}</span>
        <strong>${escapeHTML(task.task || "Untitled task")}</strong>
        <b>${escapeHTML(label)}</b>
        <div class="reminder-actions">
          <button class="ghost-button" type="button" data-snooze-task="${task.index}">Snooze</button>
          <button class="ghost-button" type="button" data-silence-task="${task.index}">Silence</button>
          <button class="ghost-button" type="button" data-end-task="${task.index}">End</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">No urgent reminders.</div>`;
}

function renderTasks() {
  const wrap = document.getElementById("taskItems");
  if (!wrap) return;
  const openIndex = state.tasks.findIndex(task => !task.task);
  wrap.innerHTML = state.tasks.length ? state.tasks.map((task, index) => `
    <details class="ops-card" ${index === openIndex ? "open" : ""}>
      <summary>
        <span><strong>${escapeHTML(task.task || "New task")}</strong><small>${escapeHTML(task.assignedTo || "Unassigned")} | ${escapeHTML(task.dueDate || "No due date")}</small></span>
        <b>${escapeHTML(task.status || "Pending")}</b>
        <button class="icon-button" type="button" data-remove-task="${index}" aria-label="Remove task">x</button>
      </summary>
      <div class="ops-card-body">
        <label>Task status
          <select data-task-field="status" data-index="${index}">
            ${["Pending", "In Progress", "Waiting", "Complete"].map(status => `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label>Task name
          <textarea data-task-field="task" data-index="${index}" placeholder="Task">${escapeHTML(task.task)}</textarea>
        </label>
        <label>Assigned to
          <input data-task-field="assignedTo" data-index="${index}" value="${escapeAttr(task.assignedTo)}" placeholder="Assigned to">
        </label>
        <label>Assigned date
          <input data-task-field="startDate" data-index="${index}" type="date" value="${escapeAttr(task.startDate)}">
        </label>
        <label>Due date
          <input data-task-field="dueDate" data-index="${index}" type="date" value="${escapeAttr(task.dueDate)}">
        </label>
        ${task.silenced ? `<button class="ghost-button" type="button" data-unsilence-task="${index}">Unsilence</button>` : ""}
      </div>
    </details>
  `).join("") : `<div class="empty-state">No tasks yet.</div>`;
}

function renderSchedule() {
  const wrap = document.getElementById("scheduleItems");
  if (!wrap) return;
  const scheduled = state.tasks
    .filter(task => task.status !== "Complete")
    .slice()
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
  wrap.innerHTML = scheduled.length ? scheduled.map(task => {
    const delta = daysUntil(task.dueDate);
    const label = delta < 0 ? `${Math.abs(delta)} day(s) overdue` : delta === 0 ? "Due today" : `Due in ${delta} day(s)`;
    return `
      <article class="timeline-item ${delta < 0 ? "expense" : "payment"}">
        <span>${escapeHTML(task.dueDate || "")}</span>
        <strong>${escapeHTML(task.task || "Scheduled task")}</strong>
        <b>${escapeHTML(label)}</b>
        <small>${escapeHTML(task.assignedTo || "")} | ${escapeHTML(task.status || "")}</small>
      </article>
    `;
  }).join("") : `<div class="empty-state">No upcoming tasks.</div>`;
}

function renderJobMaterials() {
  const wrap = document.getElementById("jobMaterialItems");
  if (!wrap) return;
  const openIndex = state.jobMaterials.findIndex(item => !item.item);
  wrap.innerHTML = state.jobMaterials.length ? state.jobMaterials.map((item, index) => `
    <details class="ops-card" ${index === openIndex ? "open" : ""}>
      <summary>
        <span><strong>${escapeHTML(item.item || "New material")}</strong><small>${escapeHTML(item.supplier || "Supplier not set")} | Needed ${escapeHTML(item.neededBy || "")}</small></span>
        <b>${escapeHTML(item.status || "Pickup pending")}</b>
        <button class="icon-button" type="button" data-remove-material="${index}" aria-label="Remove material">x</button>
      </summary>
      <div class="ops-card-body">
        <label>Material name
          <input data-material-field="item" data-index="${index}" value="${escapeAttr(item.item)}" placeholder="Material">
        </label>
        <label>Material status
          <select data-material-field="status" data-index="${index}">
            ${["Ordered", "Picked up", "Delivered", "Installed", "Backordered", "Pickup pending"].map(status => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label>Supplier
          <input data-material-field="supplier" data-index="${index}" value="${escapeAttr(item.supplier)}" placeholder="Supplier">
        </label>
        <label>Needed by date
          <input data-material-field="neededBy" data-index="${index}" type="date" value="${escapeAttr(item.neededBy)}">
        </label>
        <label>Material note
          <textarea data-material-field="note" data-index="${index}" placeholder="Note">${escapeHTML(item.note)}</textarea>
        </label>
      </div>
    </details>
  `).join("") : `<div class="empty-state">No tracked materials yet.</div>`;
}

function renderSiteLogs() {
  renderSimpleLog("siteLogItems", state.siteLogs, "site-log", "Job note");
}

function renderCommunications() {
  const wrap = document.getElementById("communicationItems");
  if (!wrap) return;
  const openIndex = state.communications.findIndex(item => !item.note);
  wrap.innerHTML = state.communications.length ? state.communications.map((item, index) => `
    <details class="ops-card" ${index === openIndex ? "open" : ""}>
      <summary>
        <span><strong>${escapeHTML(item.note || "New communication")}</strong><small>${escapeHTML(item.date || "")}</small></span>
        <b>${escapeHTML(item.type || "Text")}</b>
        <button class="icon-button" type="button" data-remove-comm="${index}" aria-label="Remove communication">x</button>
      </summary>
      <div class="ops-card-body">
        <label>Communication date
          <input data-comm-field="date" data-index="${index}" type="date" value="${escapeAttr(item.date)}">
        </label>
        <label>Communication type
          <select data-comm-field="type" data-index="${index}">
            ${["Call", "Email", "Text", "Approval", "Site discussion"].map(type => `<option ${item.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        <label>Communication note
          <textarea data-comm-field="note" data-index="${index}" placeholder="Communication note">${escapeHTML(item.note)}</textarea>
        </label>
      </div>
    </details>
  `).join("") : `<div class="empty-state">No communication logs yet.</div>`;
}

function renderPhotos() {
  const wrap = document.getElementById("photoItems");
  if (!wrap) return;
  wrap.innerHTML = state.photos.length ? state.photos.map((item, index) => `
    <details class="ops-card photo-card">
      <summary>
        <span><strong>${escapeHTML(item.filename || "Photo log")}</strong><small>${escapeHTML(item.category || "Progress")} | ${escapeHTML(item.date || "")}</small></span>
        ${item.dataUrl ? `<img src="${escapeAttr(item.dataUrl)}" alt="">` : `<b>No photo</b>`}
        <button class="icon-button" type="button" data-remove-photo="${index}" aria-label="Remove photo">x</button>
      </summary>
      <div class="ops-card-body">
        ${item.dataUrl ? `<img class="photo-preview" src="${escapeAttr(item.dataUrl)}" alt="">` : ""}
        <label>Photo date
          <input data-photo-field="date" data-index="${index}" type="date" value="${escapeAttr(item.date)}">
        </label>
        <label>Photo category
          <select data-photo-field="category" data-index="${index}">
            ${["Before", "Progress", "After", "Damage", "Receipts", "Materials"].map(type => `<option ${item.category === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        <label>File name or folder note
          <input data-photo-field="filename" data-index="${index}" value="${escapeAttr(item.filename)}" placeholder="File name or folder note">
        </label>
        <label>Photo note
          <textarea data-photo-field="note" data-index="${index}" placeholder="Photo note">${escapeHTML(item.note)}</textarea>
        </label>
      </div>
    </details>
  `).join("") : `<div class="empty-state">No photo logs yet.</div>`;
}

function renderSimpleLog(targetId, items, fieldPrefix, placeholder) {
  const wrap = document.getElementById(targetId);
  if (!wrap) return;
  const openIndex = items.findIndex(item => !item.note);
  wrap.innerHTML = items.length ? items.map((item, index) => `
    <details class="ops-card" ${index === openIndex ? "open" : ""}>
      <summary>
        <span><strong>${escapeHTML(item.note || placeholder)}</strong><small>${escapeHTML(item.date || "")}</small></span>
        <button class="icon-button" type="button" data-remove-${fieldPrefix}="${index}" aria-label="Remove log">x</button>
      </summary>
      <div class="ops-card-body">
        <label>Note date
          <input data-${fieldPrefix}-field="date" data-index="${index}" type="date" value="${escapeAttr(item.date)}">
        </label>
        <label>Site note
          <textarea data-${fieldPrefix}-field="note" data-index="${index}" placeholder="${escapeAttr(placeholder)}">${escapeHTML(item.note)}</textarea>
        </label>
      </div>
    </details>
  `).join("") : `<div class="empty-state">No site notes yet.</div>`;
}

function renderCloseout() {
  const wrap = document.getElementById("closeoutItems");
  if (!wrap) return;
  wrap.innerHTML = state.closeout.map((item, index) => `
    <label class="check-pill">
      <input type="checkbox" data-closeout-index="${index}" ${item.done ? "checked" : ""}>
      <span>${escapeHTML(item.label)}</span>
    </label>
  `).join("");
}

function renderSaveStatus() {
  const el = document.getElementById("saveStatus");
  if (!el) return;
  window.clearTimeout(saveStatusTimer);
  const time = state.meta.lastSavedAt ? new Date(state.meta.lastSavedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "";
  el.textContent = time ? `Saved at ${time}` : "Offline save active";
  el.classList.remove("is-unsaved");
  saveStatusTimer = window.setTimeout(() => {
    if (!state.meta.dirty) el.textContent = "Saved just now";
  }, 500);
}

function renderSuccessMessage() {
  const message = document.getElementById("quoteSuccessMessage");
  if (!message) return;
  message.textContent = quoteSuccessText;
  message.classList.toggle("is-hidden", !quoteSuccessText);
}

function renderFlow() {
  const mainSection = ["dashboard", "archive", "materials"].includes(activeStep) ? activeStep : "quote";
  const visibleStep = mainSection === "quote" ? activeStep : mainSection;
  document.querySelectorAll(".flow-step").forEach(section => {
    const shouldHide = section.dataset.step !== visibleStep;
    section.classList.toggle("is-step-hidden", shouldHide);
    section.hidden = shouldHide;
    section.style.display = shouldHide ? "none" : "";
  });
  document.querySelectorAll("[data-go-step]").forEach(button => {
    const isActive = button.dataset.goStep === activeStep && mainSection === "quote";
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "step");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  document.querySelectorAll("[data-main-section]").forEach(button => {
    const isActive = button.dataset.mainSection === mainSection;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  const quoteNav = document.querySelector(".quote-flow-nav");
  if (quoteNav) {
    quoteNav.classList.toggle("is-step-hidden", mainSection !== "quote");
    quoteNav.hidden = mainSection !== "quote";
    quoteNav.style.display = mainSection !== "quote" ? "none" : "";
  }
  const quoteActions = document.querySelector(".quote-builder-actions");
  if (quoteActions) {
    quoteActions.classList.toggle("is-step-hidden", mainSection !== "quote");
    quoteActions.hidden = mainSection !== "quote";
    quoteActions.style.display = mainSection !== "quote" ? "none" : "";
  }
  document.querySelector(".builder-grid")?.classList.toggle("start-only", activeStep === "start");
  document.querySelector(".builder-grid")?.classList.remove("is-step-hidden");
}

function jumpToIssue(step, selector) {
  if (step) activeStep = step;
  renderFlow();
  window.requestAnimationFrame(() => {
    const target = document.querySelector(selector);
    if (!target) return;
    const details = target.closest("details");
    if (details) details.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusable = target.matches("input, select, textarea, button")
      ? target
      : target.querySelector("input, select, textarea, button");
    focusable?.focus({ preventScroll: true });
    target.classList.add("focus-pulse");
    window.setTimeout(() => target.classList.remove("focus-pulse"), 1200);
  });
}

function autoGrowTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight + 2}px`;
}

function autoGrowAllTextareas() {
  document.querySelectorAll("textarea").forEach(autoGrowTextarea);
}

function render() {
  populateMaterialCategorySelects();
  syncControls();
  renderSiteConditions();
  renderLineItems();
  renderSubItems();
  renderTotals();
  renderReadiness();
  renderPayments();
  renderExpenses();
  renderChangeOrders();
  renderAccounting();
  renderTimeline();
  renderMaterialCatalog();
  renderJobDashboard();
  renderQuoteDocument();
  renderArchive();
  renderPricingMode();
  renderFlow();
  renderSuccessMessage();
  autoGrowAllTextareas();
  saveState();
}

function refreshQuoteFeedback() {
  renderTotals();
  renderReadiness();
  renderAccounting();
  renderTimeline();
  renderJobDashboard();
  renderQuoteDocument();
  saveState();
}

function syncPresetControls(value) {
  const presetSelect = document.getElementById("presetSelect");
  const presetMirror = document.getElementById("pricingPresetMirror");
  if (presetSelect) presetSelect.value = value;
  if (presetMirror) presetMirror.value = value;
}

function applyPricingPreset(value) {
  syncPresetControls(value);
  if (value === "custom") {
    state.meta.dirty = true;
    renderPricingMode();
    renderFlow();
    refreshQuoteFeedback();
    return;
  }
  const preset = presets[value];
  if (!preset) return;
  state.settings = { ...state.settings, ...preset };
  state.meta.dirty = true;
  render();
}

function quoteFilename(extension = "html") {
  const client = (state.project.clientName || "Client").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return `${state.settings.quoteNumber}-${client}-Claybourne-Quote.${extension}`;
}

function printPackage() {
  renderQuoteDocument();
  const originalTitle = document.title;
  document.title = quoteFilename("pdf").replace(/\.pdf$/i, "");
  window.print();
  window.setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

function submitQuote() {
  state.project.jobStatus = "Submitted";
  const record = archiveCurrentQuote("Submitted");
  newClientState();
  activeStep = "start";
  quoteSuccessText = `${record.clientName} has been submitted and saved to the archive.`;
  render();
  window.setTimeout(() => {
    quoteSuccessText = "";
    renderSuccessMessage();
  }, 5000);
}

function serviceAgreementMaterialsSummary() {
  if (state.settings.pricingMethod === "quick") {
    return numberValue(state.costs.quickMaterialCost) > 0
      ? `Material allowance: ${money(state.costs.quickMaterialCost)}`
      : "";
  }
  return state.lines
    .filter(line => line.area || line.description || line.material || numberValue(line.qty) || numberValue(line.marketRate))
    .map(line => {
      const parts = [
        line.area,
        line.description,
        line.material && line.material !== "Custom material" ? line.material : "",
        numberValue(line.qty) ? `Qty ${numberValue(line.qty)}` : ""
      ].filter(Boolean);
      return parts.join(" - ");
    })
    .join("; ");
}

function agreementText(value) {
  return escapeHTML(value || "").replace(/\n/g, "<br>");
}

function serviceField(label, value) {
  return `
    <div class="service-field">
      <span>${escapeHTML(label)}</span>
      <strong>${agreementText(value)}</strong>
    </div>
  `;
}

function serviceBox(label, value) {
  return `
    <div>
      <div class="doc-section-title">${escapeHTML(label)}</div>
      <div class="service-text-box">${agreementText(value)}</div>
    </div>
  `;
}

function serviceLegalClause(title, text) {
  return `
    <div class="service-legal-clause">
      <strong>${escapeHTML(title)}</strong>
      <span>${agreementText(text)}</span>
    </div>
  `;
}

function serviceScheduleBox(label, value) {
  return `
    <div class="service-schedule-box">
      <strong>${escapeHTML(label)}</strong>
      <span>${agreementText(value || "")}</span>
    </div>
  `;
}

function serviceBlankLine(label, value = "") {
  return `
    <div class="service-blank-line">
      <span>${escapeHTML(label)}</span>
      <strong>${agreementText(value)}</strong>
    </div>
  `;
}

function serviceHeader(title = "Service Agreement") {
  return `
    <div class="service-agreement-header">
      <img class="service-agreement-logo" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
      <h1 class="service-agreement-title">${escapeHTML(title)}</h1>
    </div>
  `;
}

function servicePrintHeader(kicker) {
  return `
    <div class="print-header compact-header">
      <img class="quote-header" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
      <div class="print-document-title">Service Agreement</div>
    </div>
    <div class="page-kicker">${escapeHTML(kicker)}</div>
  `;
}

function serviceAgreementChangeOrderRows(approvedChanges) {
  if (!approvedChanges.length) {
    return `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `;
  }
  return approvedChanges.map((order, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${agreementText(order.description || "Approved change order")}</td>
      <td>${escapeHTML(order.approvalDate || "")}</td>
      <td>${money(changeOrderAmount(order))}</td>
      <td>${agreementText(state.project.timeline || "")}</td>
    </tr>
  `).join("");
}

function pdfRectStyle(rect) {
  const [x1, y1, x2, y2] = rect;
  return [
    `left:${(x1 / 72).toFixed(4)}in`,
    `top:${((792 - y2) / 72).toFixed(4)}in`,
    `width:${((x2 - x1) / 72).toFixed(4)}in`,
    `height:${((y2 - y1) / 72).toFixed(4)}in`
  ].join(";");
}

function serviceOverlayField(value, rect, options = {}) {
  const styles = [
    pdfRectStyle(rect),
    options.size ? `font-size:${options.size}pt` : "",
    options.weight ? `font-weight:${options.weight}` : "",
    options.align ? `text-align:${options.align}` : ""
  ].filter(Boolean).join(";");
  return `<div class="service-overlay-field" style="${styles}">${agreementText(value)}</div>`;
}

function serviceOverlayLabel(text, rect, options = {}) {
  const styles = [
    pdfRectStyle(rect),
    options.size ? `font-size:${options.size}pt` : ""
  ].filter(Boolean).join(";");
  return `<div class="service-overlay-label" style="${styles}">${escapeHTML(text)}</div>`;
}

function serviceOriginalPage(pageNumber, overlays = "") {
  return `
    <article class="service-original-page">
      <img src="service-agreement-pages/page-${pageNumber}.png" alt="Service agreement page ${pageNumber}">
      ${overlays}
    </article>
  `;
}

function renderServiceAgreementDocument() {
  const target = document.getElementById("serviceAgreementDocument");
  if (!target) return;

  const t = totals();
  const approvedChanges = state.changeOrders.filter(order => ["Approved", "Completed"].includes(order.status));
  const materials = serviceAgreementMaterialsSummary();
  const scope = state.project.scopeOfWork || state.project.includedWork || "";
  const projectDates = state.project.timeline || "To be confirmed";
  const assumptions = [
    state.project.specialConditions,
    state.project.siteNotes,
    state.project.clientMaterialTerms
  ].filter(Boolean).join("\n\n");
  const warranty = `Claybourne Home Renovation provides a 1-Year Limited Workmanship Warranty on eligible completed renovation work.

This workmanship warranty covers labour and installation issues caused by Claybourne Home Renovation, including installation defects, workmanship errors, improper fastening, trim separation, grout cracking caused by improper installation, leaks caused by installation error, cabinet alignment issues, and paint peeling caused by preparation failure.

This warranty does not cover manufacturer defects, normal wear and tear, customer damage, movement or shifting of the home, moisture or pre-existing issues, plumbing or electrical systems not installed by Claybourne Home Renovation, abuse, or improper maintenance.

Claybourne Home Renovation's warranty covers labour and workmanship. Manufacturer warranties cover materials and products.`;
  const changeOrderRows = approvedChanges.map((order, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${agreementText(order.description || "Approved change order")}</td>
      <td>${escapeHTML(order.approvalDate || "")}</td>
      <td>${money(changeOrderAmount(order))}</td>
      <td>${agreementText(order.status || "Approved")}</td>
    </tr>
  `).join("");
  const backgroundTerms = [
    serviceLegalClause("Background and Purpose", "The Client retains Claybourne Home Renovation to perform residential renovation, repair, installation, construction, handyman, or related services at the Project Address. This Agreement defines expectations, scope, payment obligations, project administration, change-order procedure, performance standards, risk allocation, and dispute-resolution process."),
    serviceLegalClause("Agreement Documents", "This Agreement includes the approved quote, attached schedules, written change orders, drawings, specifications, selections, accepted estimates, written addenda, and any other written documents approved by the parties. If there is a conflict, the most recent written approval controls the affected item."),
    serviceLegalClause("Scope Limits", "The Contractor shall perform only the Work described in the approved scope and approved Change Orders. Any item not expressly included is excluded unless the parties agree otherwise in writing."),
    serviceLegalClause("Client-Supplied Information", "Where the Client supplies plans, specifications, selections, materials, appliances, fixtures, or site information, the Client is responsible for their accuracy, suitability, availability, and compatibility unless the Contractor expressly accepts responsibility in writing."),
    serviceLegalClause("Price, Estimates, and Taxes", "The Contract Price is based on visible conditions and information available when quoted. If an estimate forms part of this Agreement, the final price for listed goods and services will not exceed the original estimate by more than ten percent unless the Client agrees to new work, a new price, or a written Change Order. Applicable HST is payable as stated in the quote."),
    serviceLegalClause("Payment and Holdback", "The Client shall pay the deposit, progress payments, and final balance shown in this Agreement or the approved quote. The Client shall not withhold payment except for a good-faith dispute about defective, incomplete, or unauthorized Work. Any undisputed portion remains payable when due. Where Ontario construction lien holdback rules apply, the parties should address statutory holdback and release timing in writing before signing.")
  ].join("");
  const siteTerms = [
    serviceLegalClause("Schedule, Access, and Delays", "The Contractor shall use commercially reasonable efforts to meet the project schedule, subject to timely Client decisions, permit availability, inspection timing, product availability, weather, concealed conditions, trade availability, supplier delays, emergencies, and events beyond the Contractor's reasonable control. Client-caused delays, building rules, supplier delays, municipal delays, inspection delays, or concealed conditions may extend the schedule and may create additional costs."),
    serviceLegalClause("Client Responsibilities", "The Client must provide accurate project information, ownership authority, condominium or landlord approvals, building rules, access requirements, timely selections, timely approvals, and timely payments. The Client must remove valuables, fragile items, personal property, pets, and obstructions from the work area and must disclose known hazards, leaks, structural concerns, prior unpermitted work, and other relevant site conditions."),
    serviceLegalClause("Materials and Substitutions", "Natural materials, wood, stone, tile, grout, paint, stain, metal, and manufactured products may vary in colour, grain, texture, size, lot, sheen, pattern, and appearance. Reasonable variations are not deficiencies. If a product is unavailable, delayed, discontinued, unsuitable, or materially changed in price, the Contractor may propose a comparable substitution. Substitutions affecting appearance, price, performance, or schedule require Client approval."),
    serviceLegalClause("Permits, Code, and Regulated Trades", "Electrical, plumbing, HVAC, gas, structural, engineering, architectural, environmental, or other regulated work may require licensed trades, inspections, permits, drawings, or third-party professionals. Such costs are included only if expressly listed. If an inspection requires correction of pre-existing work, concealed conditions, unpermitted past work, or Client-supplied materials, the related cost and delay will be handled by Change Order unless caused by the Contractor."),
    serviceLegalClause("Existing and Concealed Conditions", "The Contract Price is based on visible conditions and information available when the Agreement is signed. Existing or concealed conditions may include rot, mould, asbestos, lead, pests, water damage, structural issues, unsafe wiring, deficient plumbing, code non-compliance, uneven framing, hidden utilities, or prior defective work. If concealed or unexpected conditions are discovered, the Contractor may pause affected Work, secure the area, notify the Client, and provide options by Change Order."),
    serviceLegalClause("Site Protection, Safety, and Clean-Up", "The Contractor shall take reasonable steps to protect the work area and adjacent areas from avoidable damage, dust, and debris, recognizing that renovation work is disruptive and may create noise, vibration, dust, odours, and temporary service interruptions. Professional deep cleaning, air duct cleaning, moving services, and specialty remediation are excluded unless listed.")
  ].join("");
  const riskTerms = [
    serviceLegalClause("Change Orders", "No change to scope, specifications, materials, schedule, price, or assumptions is binding unless approved in writing by the Client and Contractor before the changed Work begins, except for urgent work required to protect life, safety, property, or the Work. Verbal requests, text messages, emails, site conversations, design revisions, product changes, and additional tasks may constitute approval if they clearly show Client authorization and the Contractor reasonably relies on them."),
    serviceLegalClause("Subcontractors, Insurance, and WSIB", "The Contractor may use employees, independent subcontractors, specialty trades, suppliers, and consultants to perform or support the Work. The Contractor remains responsible for coordinating subcontracted Work within the agreed scope. The Contractor shall maintain commercially reasonable insurance for its operations. Required Workplace Safety and Insurance Board coverage should be confirmed for the project before work begins."),
    serviceLegalClause("Performance, Review, and Completion", "The Contractor shall perform the Work with reasonable skill and care consistent with accepted residential renovation practice for the type, age, and condition of the property. Near Substantial Completion, the parties shall conduct a reasonable review and prepare a deficiency list. Minor deficiencies, manufacturer backorders, seasonal work, warranty items, or third-party delays do not justify withholding the full unpaid balance where the Work is otherwise substantially complete and usable."),
    serviceLegalClause("Warranty Limits", "The 1-Year Limited Workmanship Warranty applies only to eligible completed renovation work for defects caused by Claybourne Home Renovation's labour or workmanship within the agreed scope. Manufacturer warranties apply to materials, products, fixtures, appliances, and equipment. The warranty does not cover manufacturer defects, normal wear and tear, customer damage, movement or shifting of the home, moisture or pre-existing issues, plumbing or electrical systems not installed by Claybourne Home Renovation, abuse, improper maintenance, third-party work, unauthorized repairs, or damage from accidents, weather, pets, tenants, or occupants."),
    serviceLegalClause("Cancellation, Suspension, and Termination", "Where the Consumer Protection Act, 2002 or other applicable law gives the Client a cooling-off period or cancellation right, that right applies regardless of any contrary wording in this Agreement. The Contractor may suspend Work if the Client fails to pay undisputed amounts, denies access, fails to make required selections, interferes with safety, or materially breaches the Agreement. On termination, the Client shall pay for completed Work, materials ordered or restocking fees, demobilization, approved Change Orders, and reasonable costs incurred to the termination date, less amounts already paid."),
    serviceLegalClause("Dispute Resolution", "The parties shall first attempt to resolve concerns through direct discussion. If unresolved, either party may provide written notice describing the dispute, requested remedy, supporting documents, and proposed resolution meeting date. The parties may agree to mediation before litigation or other remedies. Nothing prevents a party from preserving lien rights, seeking urgent relief, collecting undisputed amounts, or using a statutory complaint process where available.")
  ].join("");
  const liabilityTerms = [
    serviceLegalClause("Limitation of Liability", "To the maximum extent permitted by law, the Contractor is not liable for indirect, incidental, consequential, special, exemplary, or punitive damages, including loss of use, temporary accommodation, inconvenience, lost income, financing costs, or emotional distress, except where such limitation is prohibited by law. The Contractor's aggregate liability arising from this Agreement shall not exceed amounts paid to the Contractor under this Agreement, except for liability that cannot legally be limited, insured claims actually paid by insurance, or damage caused by gross negligence or wilful misconduct."),
    serviceLegalClause("Client Indemnity", "The Client shall indemnify the Contractor from claims, losses, penalties, and costs arising from inaccurate Client information, Client-supplied materials, unsafe Client conduct, pre-existing conditions, third-party work, undisclosed hazards, or lack of required owner, condominium, landlord, or municipal approvals."),
    serviceLegalClause("Privacy, Photography, and Records", "The Contractor may collect and use Client contact information, project information, photographs, communications, invoices, and records for estimating, scheduling, performing, documenting, warranty, accounting, insurance, legal, and business administration purposes. Public marketing use of identifiable addresses, people, personal items, or private information requires Client consent."),
    serviceLegalClause("Notices and Entire Agreement", "Notices may be delivered by personal delivery, courier, mail, or email to the addresses listed in this Agreement. This Agreement, attached schedules, approved quote, and approved Change Orders form the entire agreement and replace prior discussions, proposals, advertisements, estimates, or representations not included in writing. If a provision is unenforceable, the remaining provisions continue in effect."),
    serviceLegalClause("Severability and Waiver", "If any provision of this Agreement is found unenforceable, the remaining provisions continue in effect to the fullest extent permitted by law. A waiver must be written and applies only to the specific matter waived. A delay in enforcing a right does not waive that right."),
    serviceLegalClause("Governing Law", "This Agreement is governed by the laws of Ontario and the laws of Canada applicable in Ontario, unless another province or territory is expressly stated in writing.")
  ].join("");
  const scheduleARows = [
    serviceScheduleBox("Rooms / Areas Included", state.project.roomsAreas),
    serviceScheduleBox("Included Work", state.project.includedWork || scope),
    serviceScheduleBox("Excluded Work", state.project.excludedWork),
    serviceScheduleBox("Materials and Finishes", materials || state.project.finishLevel),
    serviceScheduleBox("Demolition and Disposal", state.costs.disposalCost ? `Disposal/bin allowance: ${money(state.costs.disposalCost)}.` : "As listed in the approved quote only."),
    serviceScheduleBox("Protection and Clean-Up", state.costs.protectionCost ? `Protection/cleanup allowance: ${money(state.costs.protectionCost)}.` : "Ordinary construction cleanup only unless listed."),
    serviceScheduleBox("Assumptions and Client-Supplied Items", assumptions || state.project.clientMaterialTerms)
  ].join("");
  const scheduleBRows = `
    <tr>
      <td>1</td>
      <td>Initial Deposit (Materials)</td>
      <td>${money(t.materialDeposit)}</td>
      <td>Before materials are ordered</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Progress payment</td>
      <td>Per approved quote</td>
      <td>${agreementText(state.project.paymentSchedule || "Per agreed progress milestone.")}</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Final balance</td>
      <td>${money(t.balance)}</td>
      <td>Upon substantial completion</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Approved change orders</td>
      <td>${approvedChanges.length ? money(t.changeOrderDirect) : "$0.00"}</td>
      <td>As approved in writing</td>
    </tr>
  `;
  const selectionRows = [
    ["Tile / Flooring", state.project.finishLevel || ""],
    ["Paint / Stain", ""],
    ["Fixtures / Hardware", ""],
    ["Cabinetry / Countertops", ""],
    ["Other", ""]
  ].map(([label, value]) => `
    <tr>
      <td>${escapeHTML(label)}</td>
      <td>${agreementText(value)}</td>
      <td></td>
    </tr>
  `).join("");

  target.innerHTML = `
    <article class="quote-page service-print-page service-agreement-cover">
      <div class="cover-inner">
        <img class="cover-logo" src="24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png" alt="Claybourne Home Renovation">
        <div class="cover-rule"></div>
        <p class="cover-kicker">Professional Renovation & Handyman Services</p>
        <h1>Service Agreement</h1>
        <div class="cover-meta">
          <div>
            <span>Client</span>
            <strong>${escapeHTML(state.project.clientName || "Client Name")}</strong>
          </div>
          <div>
            <span>Project Address</span>
            <strong>${escapeHTML(state.project.projectAddress || "Project Address")}</strong>
          </div>
          <div>
            <span>Quote Number</span>
            <strong>${escapeHTML(state.settings.quoteNumber || "")}</strong>
          </div>
          <div>
            <span>Agreement Date</span>
            <strong>${escapeHTML(state.settings.quoteDate || todayISO())}</strong>
          </div>
        </div>
        <p class="cover-note">Prepared by Claybourne Home Renovation</p>
      </div>
    </article>

    <article class="quote-page service-print-page">
      ${servicePrintHeader("Agreement Details")}
      <div class="service-bar">Agreement Details</div>
      <div class="service-form-grid">
        ${serviceField("Agreement Date", state.settings.quoteDate || todayISO())}
        ${serviceField("Client Name(s)", state.project.clientName)}
        ${serviceField("Contractor Name", "Claybourne Home Renovation")}
        ${serviceField("Project Address", state.project.projectAddress)}
        ${serviceField("Contractor Phone", "")}
        ${serviceField("Client Phone", state.project.clientPhone)}
        ${serviceField("Contractor Email", "")}
        ${serviceField("Client Email", state.project.clientEmail)}
        ${serviceField("Project Type", state.project.projectType)}
        ${serviceField("Start / Completion", projectDates)}
        ${serviceField("Quote Number", state.settings.quoteNumber)}
        ${serviceField("Quote Valid Until", state.settings.validUntil)}
      </div>

      <div class="service-bar">Project Scope</div>
      <div class="service-section-grid">
        ${serviceBox("Scope of Work", scope || "Scope to be confirmed in the approved quote.")}
        ${serviceBox("Rooms / Areas", state.project.roomsAreas)}
        ${serviceBox("Included Work", state.project.includedWork || scope)}
        ${serviceBox("Excluded Work", state.project.excludedWork)}
        ${serviceBox("Finishes / Materials", materials || state.project.finishLevel)}
        ${serviceBox("Site Conditions / Assumptions", assumptions || siteConditionSummary())}
      </div>
      <div class="page-fill-note">This agreement is based on the approved quote, visible site conditions, listed assumptions, and client selections available at the time of preparation.</div>
    </article>

    <article class="quote-page service-print-page">
      ${servicePrintHeader("Price, Payment & Terms")}
      <div class="service-bar">Contract Price & Payment Schedule</div>
      <table class="service-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Due</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial Deposit (Materials)</td>
            <td>${money(t.materialDeposit)}</td>
            <td>Before materials are ordered</td>
            <td>Initial deposit equals the calculated material cost.</td>
          </tr>
          <tr>
            <td>Balance Due</td>
            <td>${money(t.balance)}</td>
            <td>Per approved schedule / substantial completion</td>
            <td>${agreementText(state.project.paymentSchedule || "Remaining balance due according to the approved quote and project milestones.")}</td>
          </tr>
          <tr>
            <td>Total Quote</td>
            <td>${money(t.totalQuote)}</td>
            <td>As stated in approved quote</td>
            <td>Includes applicable HST shown in the quote package.</td>
          </tr>
        </tbody>
      </table>

      <div class="service-bar">Project Terms</div>
      <div class="service-section-grid">
        ${serviceBox("Change Orders", state.project.changeOrderTerms)}
        ${serviceBox("Subcontractors / Trades", subcontractorSummary())}
        ${serviceBox("Permits & Code", permitSummary())}
        ${serviceBox("Client-Supplied Materials", state.project.clientMaterialTerms)}
      </div>

      <div class="service-bar">Warranty</div>
      <div class="service-text-box service-full-box">${agreementText(warranty)}</div>
      <div class="page-fill-note">Manufacturer warranties remain with their respective manufacturers. Claybourne's limited warranty applies to eligible workmanship only.</div>
    </article>

    <article class="quote-page service-print-page service-legal-page service-legal-page-combined">
      ${servicePrintHeader("Agreement, Site & Scope Terms")}
      <div class="service-bar">Agreement Foundation</div>
      <div class="service-legal-grid compact-legal-grid">${backgroundTerms}${siteTerms}</div>
      <div class="page-fill-note">These legal terms apply together with the approved quote, schedules, selections, and written change orders.</div>
    </article>

    <article class="quote-page service-print-page service-legal-page service-legal-page-combined">
      ${servicePrintHeader("Change, Risk & Liability Terms")}
      <div class="service-bar">Change, Warranty, Liability & Notices</div>
      <div class="service-legal-grid compact-legal-grid">${riskTerms}${liabilityTerms}</div>
      <div class="page-fill-note">Warranty coverage is limited to eligible workmanship. Product and manufacturer issues remain subject to manufacturer warranty terms.</div>
    </article>

    <article class="quote-page service-print-page service-schedule-page">
      ${servicePrintHeader("Schedule A & B")}
      <div class="service-bar">Schedule A - Detailed Scope of Work</div>
      <div class="service-schedule-grid">${scheduleARows}</div>

      <div class="service-bar">Schedule B - Price and Payment Schedule</div>
      <table class="service-table service-schedule-table">
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Due Date / Trigger</th>
          </tr>
        </thead>
        <tbody>${scheduleBRows}</tbody>
      </table>
      <div class="service-text-box service-compact-note">Holdback / lien note, if applicable: statutory holdback, release timing, and related documentation must be addressed in writing where applicable.</div>
    </article>

    <article class="quote-page service-print-page service-schedule-page">
      ${servicePrintHeader("Schedule C, D, E & F")}
      <div class="service-bar">Schedule C - Selection Deadlines</div>
      <table class="service-table service-schedule-table">
        <thead>
          <tr>
            <th>Selection</th>
            <th>Selection / Notes</th>
            <th>Due By</th>
          </tr>
        </thead>
        <tbody>${selectionRows}</tbody>
      </table>

      <div class="service-bar">Schedule D - Permits and Approvals</div>
      <div class="service-schedule-grid two-up">
        ${serviceScheduleBox("Client responsible for obtaining", "")}
        ${serviceScheduleBox("Contractor responsible for obtaining", numberValue(state.costs.permitCost) ? `Permit/drawing allowance included: ${money(state.costs.permitCost)}.` : "")}
        ${serviceScheduleBox("Condominium / landlord approvals", "")}
        ${serviceScheduleBox("Regulated work notice", "Work may require municipal, ESA, plumbing, gas, HVAC, structural, engineering, environmental, or other approval depending on scope.")}
      </div>

      <div class="service-bar">Schedule E - Warranty Details</div>
      <div class="service-schedule-grid two-up">
        ${serviceScheduleBox("Workmanship warranty period", "1-Year Limited Workmanship Warranty from Substantial Completion.")}
        ${serviceScheduleBox("Manufacturer warranties", "Materials/products only, as available from the manufacturer.")}
        ${serviceScheduleBox("Warranty contact", "Claybourne Home Renovation")}
        ${serviceScheduleBox("Special exclusions or added coverage", "Manufacturer defects, normal wear and tear, customer damage, house movement, moisture/pre-existing issues, and systems not installed by Claybourne are excluded.")}
      </div>

      <div class="service-bar">Schedule F - Photography Consent</div>
      <div class="service-schedule-grid three-up">
        ${serviceScheduleBox("Documentation photos", "Yes / No")}
        ${serviceScheduleBox("Portfolio before-and-after use", "Yes / No")}
        ${serviceScheduleBox("Social media use", "Yes / No")}
      </div>
    </article>

    <article class="quote-page service-print-page approval-print-page">
      ${servicePrintHeader("Approval")}
      <div class="service-bar">Schedule G - Change Order Form</div>
      ${approvedChanges.length ? `
        <table class="service-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Approval Date</th>
              <th>Added Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${changeOrderRows}</tbody>
        </table>
      ` : `
        <div class="service-schedule-grid two-up">
          ${serviceBlankLine("Change Order No.")}
          ${serviceBlankLine("Date")}
          ${serviceBlankLine("Requested By", "Client / Contractor / Other")}
          ${serviceBlankLine("Price Impact")}
          ${serviceScheduleBox("Description of Change", "")}
          ${serviceScheduleBox("Schedule Impact / Notes", "")}
        </div>
      `}

      <div class="service-bar">Schedule H - Client Cancellation Notice</div>
      <div class="service-text-box service-compact-note">If the Client has a statutory cancellation right, the Client may send written notice to Claybourne Home Renovation at the contact information listed in this Agreement. The notice should identify the Client, Project Address, Agreement Date, and state that the Client is cancelling the Agreement.</div>
      <div class="service-schedule-grid two-up">
        ${serviceBlankLine("Client Name", state.project.clientName)}
        ${serviceBlankLine("Project Address", state.project.projectAddress)}
        ${serviceBlankLine("Agreement Date", state.settings.quoteDate || todayISO())}
        ${serviceBlankLine("Date Notice Sent")}
      </div>

      <div class="service-bar">Acceptance & Signatures</div>
      <div class="service-note">By signing below, the parties confirm that they have reviewed and accepted the approved quote, scope, exclusions, payment terms, change order terms, warranty terms, and service agreement.</div>
      <div class="service-signature-grid">
        ${serviceField("Client Signature", "")}
        ${serviceField("Contractor Signature", "")}
        ${serviceField("Client Name", state.project.clientName)}
        ${serviceField("Representative Name / Title", "")}
        ${serviceField("Date", "")}
        ${serviceField("Date", "")}
      </div>
      <div class="approval-notes service-approval-notes">
        <div>
          <strong>Concealed Conditions</strong>
          <span>Hidden damage, mold, rot, structural concerns, code deficiencies, or issues discovered after demolition are not included unless specifically stated.</span>
        </div>
        <div>
          <strong>Change Orders</strong>
          <span>Any work outside the approved scope must be priced and approved before proceeding.</span>
        </div>
        <div>
          <strong>Quote Expiry</strong>
          <span>This agreement follows the approved quote and pricing shown as valid until ${escapeHTML(state.settings.validUntil || "")}.</span>
        </div>
      </div>
    </article>
  `;
}

function printServiceAgreement() {
  renderServiceAgreementDocument();
  const originalTitle = document.title;
  document.title = `${state.settings.quoteNumber || "Claybourne"}-Service-Agreement`;
  document.body.classList.add("printing-service-agreement");
  window.print();
  window.setTimeout(() => {
    document.body.classList.remove("printing-service-agreement");
    document.title = originalTitle;
  }, 1000);
}

function bindEvents() {
  document.addEventListener("dragover", event => {
    if (!event.dataTransfer?.types?.includes("Files")) return;
    event.preventDefault();
  });
  document.addEventListener("drop", event => {
    if (!event.dataTransfer?.types?.includes("Files")) return;
    if (event.target.closest("#materialScreenshotZone, #photoDropZone")) return;
    event.preventDefault();
  });

  document.addEventListener("input", event => {
    if (event.target.matches("textarea")) autoGrowTextarea(event.target);
  });

  for (const id of settingIds) {
    const field = document.getElementById(id);
    const updateSetting = event => {
      state.settings[id] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
      syncPresetControls("custom");
      if (id === "quoteDate" && !state.meta.finalized) {
        state.settings.quoteNumber = quoteNumber(sequenceForDate(state.settings.quoteDate), new Date(state.settings.quoteDate));
        syncControls();
      }
      if (id === "quoteNumber") state.meta.finalized = false;
      if (id !== "quoteNumber") state.meta.dirty = true;
      if (["hourlyRate", "wasteRate", "materialMarkupRate", "standardSavingsRate"].includes(id)) renderLineItems();
      if (id === "pricingMethod") {
        renderPricingMode();
        syncControls();
        renderFlow();
      }
      refreshQuoteFeedback();
    };
    field?.addEventListener("input", updateSetting);
    field?.addEventListener("change", updateSetting);
  }

  for (const id of projectIds) {
    const field = document.getElementById(id);
    const updateProject = event => {
      state.project[id] = event.target.value;
      state.meta.dirty = true;
      if (id === "projectType") {
        applyJobTemplate(event.target.value, true);
        render();
        return;
      }
      if (id === "materialSupply") {
        renderLineItems();
        renderTotals();
      }
      refreshQuoteFeedback();
    };
    field?.addEventListener("input", updateProject);
    field?.addEventListener("change", updateProject);
  }

  for (const id of costIds) {
    const field = document.getElementById(id);
    const updateCost = event => {
      state.costs[id] = numberValue(event.target.value);
      state.meta.dirty = true;
      refreshQuoteFeedback();
    };
    field?.addEventListener("input", updateCost);
    field?.addEventListener("change", updateCost);
  }

  document.getElementById("quickRiskLevel").addEventListener("change", event => {
    state.costs.quickRiskLevel = event.target.value;
    state.meta.dirty = true;
    refreshQuoteFeedback();
  });

  document.getElementById("siteConditions").addEventListener("change", () => {
    state.project.siteConditions = [...document.querySelectorAll("#siteConditions input:checked")].map(input => input.value);
    state.meta.dirty = true;
    refreshQuoteFeedback();
  });

  document.getElementById("presetSelect").addEventListener("change", event => {
    applyPricingPreset(event.target.value);
  });
  document.getElementById("pricingPresetMirror")?.addEventListener("change", event => {
    applyPricingPreset(event.target.value);
  });

  document.getElementById("lineItems").addEventListener("input", handleLineEdit);
  document.getElementById("lineItems").addEventListener("change", handleLineEdit);
  document.getElementById("lineItems").addEventListener("click", event => {
    const index = event.target.dataset.remove;
    if (index === undefined) return;
    state.lines.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });
  document.getElementById("lineItemCards")?.addEventListener("input", handleLineEdit);
  document.getElementById("lineItemCards")?.addEventListener("change", handleLineEdit);
  document.getElementById("lineItemCards")?.addEventListener("click", event => {
    const closeIndex = event.target.dataset.closeLine;
    if (closeIndex !== undefined) {
      event.preventDefault();
      const details = event.target.closest("details");
      if (details) details.open = false;
      openLineIndex = null;
      return;
    }
    const index = event.target.dataset.remove;
    if (index === undefined) return;
    state.lines.splice(Number(index), 1);
    openLineIndex = null;
    state.meta.dirty = true;
    render();
  });

  document.getElementById("subItems").addEventListener("input", handleSubEdit);
  document.getElementById("subItems").addEventListener("click", event => {
    const index = event.target.dataset.removeSub;
    if (index === undefined) return;
    state.subs.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });

  document.getElementById("addSub").addEventListener("click", () => {
    state.subs.push(defaultSub());
    state.meta.dirty = true;
    render();
  });

  document.getElementById("addLine").addEventListener("click", () => {
    state.lines.push(defaultLine({ quality: "Premium", marketRate: 0 }));
    openLineIndex = state.lines.length - 1;
    state.meta.dirty = true;
    render();
    window.requestAnimationFrame(() => {
      document.querySelector(`[data-close-line="${openLineIndex}"]`)?.closest(".line-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.getElementById("printQuote").addEventListener("click", () => {
    if (!confirmPrintIfNeeded()) return;
    markQuoteIssued();
    archiveCurrentQuote("Printed");
    printPackage();
  });

  document.getElementById("printQuotePackage")?.addEventListener("click", () => {
    if (!confirmPrintIfNeeded()) return;
    markQuoteIssued();
    archiveCurrentQuote("Printed");
    printPackage();
  });

  document.getElementById("printServiceAgreement")?.addEventListener("click", printServiceAgreement);
  document.getElementById("submitQuote")?.addEventListener("click", submitQuote);

  document.getElementById("loadArchive").addEventListener("click", () => {
    loadArchivedQuote(document.getElementById("archiveList").value);
  });

  document.getElementById("deleteArchive").addEventListener("click", () => {
    if (!window.confirm("Delete this archived quote?")) return;
    deleteArchivedQuote(document.getElementById("archiveList").value);
  });
  document.getElementById("duplicateArchive")?.addEventListener("click", () => {
    duplicateArchivedQuote(document.getElementById("archiveList").value);
  });
  document.getElementById("archiveSearch")?.addEventListener("input", renderArchive);
  document.getElementById("archiveStatusFilter")?.addEventListener("change", renderArchive);
  document.getElementById("archiveCards")?.addEventListener("click", event => {
    const card = event.target.closest("[data-archive-card]");
    const id = card?.dataset.archiveCard;
    if (!id) return;
    const select = document.getElementById("archiveList");
    if (select) select.value = id;
    document.querySelectorAll(".archive-card.is-selected").forEach(item => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });
  document.getElementById("exportArchive")?.addEventListener("click", exportArchiveBackup);
  document.getElementById("importArchive")?.addEventListener("change", importArchiveBackup);
  document.getElementById("openDashboardJob")?.addEventListener("click", openDashboardJob);
  document.getElementById("dashboardJobSelect")?.addEventListener("change", renderDashboardJobPreview);
  document.getElementById("activeJobCards")?.addEventListener("click", event => {
    const id = event.target.closest("[data-open-dashboard-job]")?.dataset.openDashboardJob;
    if (!id || id === "__current__") return;
    const select = document.getElementById("dashboardJobSelect");
    if (select) select.value = id;
    openDashboardJob();
  });

  document.getElementById("resetSample").addEventListener("click", () => {
    if (!confirmNewClient()) return;
    newClientState();
    activeStep = "start";
    render();
  });
  document.getElementById("clearQuote")?.addEventListener("click", () => {
    if (!confirmClearQuote()) return;
    newClientState();
    activeStep = "start";
    render();
  });

  document.querySelectorAll("[data-go-step]").forEach(button => {
    button.addEventListener("click", () => {
      activeStep = button.dataset.goStep;
      renderFlow();
    });
  });

  document.querySelectorAll("[data-main-section]").forEach(button => {
    button.addEventListener("click", () => {
      const section = button.dataset.mainSection;
      if (section === "quote") {
        if (!quoteSteps.includes(activeStep)) activeStep = "start";
      } else {
        activeStep = section;
      }
      renderFlow();
    });
  });

  document.getElementById("materialSearch")?.addEventListener("input", renderMaterialCatalog);
  document.getElementById("materialCategoryFilter")?.addEventListener("change", renderMaterialCatalog);
  document.getElementById("saveManualMaterial")?.addEventListener("click", saveManualMaterial);
  document.getElementById("clearManualMaterial")?.addEventListener("click", clearManualMaterialForm);
  document.getElementById("manualImageInput")?.addEventListener("change", event => {
    setManualMaterialImageFile(event.target.files?.[0]);
  });
  document.getElementById("fillMaterialFromText")?.addEventListener("click", fillMaterialFromOcrText);
  document.getElementById("materialOcrText")?.addEventListener("input", () => {
    window.clearTimeout(window.materialOcrParseTimer);
    window.materialOcrParseTimer = window.setTimeout(fillMaterialFromOcrText, 400);
  });
  document.getElementById("extractMaterialFromImage")?.addEventListener("click", extractMaterialFromScreenshot);
  document.getElementById("materialScreenshotZone")?.addEventListener("click", () => document.getElementById("materialScreenshotInput")?.click());
  document.getElementById("materialScreenshotInput")?.addEventListener("change", event => {
    setMaterialScreenshotFile(event.target.files?.[0]);
  });
  document.getElementById("materialScreenshotZone")?.addEventListener("dragover", event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    event.currentTarget.classList.add("is-dragging");
  });
  document.getElementById("materialScreenshotZone")?.addEventListener("dragleave", event => {
    event.currentTarget.classList.remove("is-dragging");
  });
  document.getElementById("materialScreenshotZone")?.addEventListener("drop", event => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("is-dragging");
    const file = [...event.dataTransfer.files].find(item => item.type.startsWith("image/"));
    setMaterialScreenshotFile(file);
  });
  document.getElementById("materialProductList")?.addEventListener("click", event => {
    const useId = event.target.closest("[data-use-material]")?.dataset.useMaterial;
    const editId = event.target.closest("[data-edit-material]")?.dataset.editMaterial;
    if (useId) useSupplierMaterial(useId);
    if (editId) editSupplierMaterial(editId);
  });

  document.getElementById("createTask")?.addEventListener("click", () => {
    dashboardDrafts.task = defaultTask();
    renderTaskDraftMenu();
    autoGrowAllTextareas();
  });
  document.getElementById("taskCreateMenu")?.addEventListener("input", handleDashboardDraftEdit);
  document.getElementById("taskCreateMenu")?.addEventListener("change", handleDashboardDraftEdit);
  document.getElementById("taskCreateMenu")?.addEventListener("click", handleDashboardDraftAction);
  document.getElementById("taskItems")?.addEventListener("input", handleTaskEdit);
  document.getElementById("taskItems")?.addEventListener("change", handleTaskEdit);
  document.getElementById("taskItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removeTask;
    if (index !== undefined) {
      event.preventDefault();
      state.tasks.splice(Number(index), 1);
      state.meta.dirty = true;
      render();
      return;
    }
    const unsilence = event.target.dataset.unsilenceTask;
    if (unsilence === undefined) return;
    event.preventDefault();
    state.tasks[Number(unsilence)].silenced = false;
    state.meta.dirty = true;
    renderJobDashboard();
    saveState();
  });

  document.getElementById("dashboardReminders")?.addEventListener("click", event => {
    const snoozeIndex = event.target.dataset.snoozeTask;
    const silenceIndex = event.target.dataset.silenceTask;
    const endIndex = event.target.dataset.endTask;
    if (snoozeIndex !== undefined) {
      state.tasks[Number(snoozeIndex)].snoozedUntil = futureISO(1);
      state.meta.dirty = true;
      renderJobDashboard();
      saveState();
    }
    if (silenceIndex !== undefined) {
      state.tasks[Number(silenceIndex)].silenced = true;
      state.meta.dirty = true;
      renderJobDashboard();
      saveState();
    }
    if (endIndex !== undefined) {
      state.tasks[Number(endIndex)].status = "Complete";
      state.tasks[Number(endIndex)].silenced = true;
      state.meta.dirty = true;
      renderJobDashboard();
      saveState();
    }
  });

  document.getElementById("createJobMaterial")?.addEventListener("click", () => {
    dashboardDrafts.material = defaultJobMaterial();
    renderMaterialDraftMenu();
    autoGrowAllTextareas();
  });
  document.getElementById("materialCreateMenu")?.addEventListener("input", handleDashboardDraftEdit);
  document.getElementById("materialCreateMenu")?.addEventListener("change", handleDashboardDraftEdit);
  document.getElementById("materialCreateMenu")?.addEventListener("click", handleDashboardDraftAction);
  document.getElementById("jobMaterialItems")?.addEventListener("input", handleJobMaterialEdit);
  document.getElementById("jobMaterialItems")?.addEventListener("change", handleJobMaterialEdit);
  document.getElementById("jobMaterialItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removeMaterial;
    if (index === undefined) return;
    event.preventDefault();
    state.jobMaterials.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });

  document.getElementById("createSiteLog")?.addEventListener("click", () => {
    dashboardDrafts.siteLog = defaultSiteLog();
    renderSiteLogDraftMenu();
    autoGrowAllTextareas();
  });
  document.getElementById("siteLogCreateMenu")?.addEventListener("input", handleDashboardDraftEdit);
  document.getElementById("siteLogCreateMenu")?.addEventListener("change", handleDashboardDraftEdit);
  document.getElementById("siteLogCreateMenu")?.addEventListener("click", handleDashboardDraftAction);
  document.getElementById("siteLogItems")?.addEventListener("input", handleSiteLogEdit);
  document.getElementById("siteLogItems")?.addEventListener("change", handleSiteLogEdit);
  document.getElementById("siteLogItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removeSiteLog;
    if (index === undefined) return;
    event.preventDefault();
    state.siteLogs.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });

  document.getElementById("createCommunication")?.addEventListener("click", () => {
    dashboardDrafts.communication = defaultCommunication();
    renderCommunicationDraftMenu();
  });
  document.getElementById("communicationCreateMenu")?.addEventListener("input", handleDashboardDraftEdit);
  document.getElementById("communicationCreateMenu")?.addEventListener("change", handleDashboardDraftEdit);
  document.getElementById("communicationCreateMenu")?.addEventListener("click", handleDashboardDraftAction);
  document.getElementById("communicationItems")?.addEventListener("input", handleCommunicationEdit);
  document.getElementById("communicationItems")?.addEventListener("change", handleCommunicationEdit);
  document.getElementById("communicationItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removeComm;
    if (index === undefined) return;
    event.preventDefault();
    state.communications.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });

  document.getElementById("photoDropZone")?.addEventListener("click", () => document.getElementById("photoUploadInput")?.click());
  document.getElementById("photoUploadInput")?.addEventListener("change", event => {
    addPhotoFiles(event.target.files);
    event.target.value = "";
  });
  document.getElementById("photoDropZone")?.addEventListener("dragover", event => {
    event.preventDefault();
    event.currentTarget.classList.add("is-dragging");
  });
  document.getElementById("photoDropZone")?.addEventListener("dragleave", event => {
    event.currentTarget.classList.remove("is-dragging");
  });
  document.getElementById("photoDropZone")?.addEventListener("drop", event => {
    event.preventDefault();
    event.currentTarget.classList.remove("is-dragging");
    addPhotoFiles(event.dataTransfer.files);
  });
  document.getElementById("photoItems")?.addEventListener("input", handlePhotoEdit);
  document.getElementById("photoItems")?.addEventListener("change", handlePhotoEdit);
  document.getElementById("photoItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removePhoto;
    if (index === undefined) return;
    event.preventDefault();
    state.photos.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });

  document.getElementById("closeoutItems")?.addEventListener("change", event => {
    const index = Number(event.target.dataset.closeoutIndex);
    if (Number.isNaN(index)) return;
    state.closeout[index].done = event.target.checked;
    state.meta.dirty = true;
    saveState();
  });

  document.addEventListener("click", handleDashboardOutsideClick);
  document.addEventListener("click", handleMaterialOutsideClick);
  document.getElementById("readinessChecklist")?.addEventListener("click", event => {
    const item = event.target.closest("[data-step-target]");
    if (!item) return;
    jumpToIssue(item.dataset.stepTarget, item.dataset.focusTarget);
  });

  document.getElementById("quoteWarnings")?.addEventListener("click", event => {
    const item = event.target.closest("[data-step-target]");
    if (!item) return;
    jumpToIssue(item.dataset.stepTarget, item.dataset.focusTarget);
  });

  document.getElementById("addChangeOrder")?.addEventListener("click", () => {
    state.changeOrders.push(defaultChangeOrder());
    state.meta.dirty = true;
    render();
  });
  document.getElementById("changeOrderItems")?.addEventListener("input", handleChangeOrderEdit);
  document.getElementById("changeOrderItems")?.addEventListener("change", handleChangeOrderEdit);
  document.getElementById("changeOrderItems")?.addEventListener("click", event => {
    const index = event.target.dataset.removeChange;
    if (index === undefined) return;
    state.changeOrders.splice(Number(index), 1);
    state.meta.dirty = true;
    render();
  });
}

function handleLineEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.field;
  if (!field || Number.isNaN(index)) return;

  const value = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
  state.lines[index][field] = value;

  if (field === "material") {
    state.lines[index].marketRate = materialCatalog[value] ?? 0;
    const rateInput = event.target.closest("tr, .line-card")?.querySelector('[data-field="marketRate"]');
    if (rateInput) rateInput.value = state.lines[index].marketRate;
  }

  const totalCell = event.target.closest("tr, .line-card")?.querySelector(".line-total");
  if (totalCell) totalCell.textContent = money(lineCost(state.lines[index]).lineTotal);
  state.meta.dirty = true;
  renderTotals();
  renderReadiness();
  renderAccounting();
  renderQuoteDocument();
  saveState();
}

function handleSubEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.subField;
  if (!field || Number.isNaN(index)) return;
  state.subs[index][field] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
  state.meta.dirty = true;
  renderTotals();
  renderReadiness();
  renderAccounting();
  renderQuoteDocument();
  saveState();
}

function handlePaymentEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.paymentField;
  if (!field || Number.isNaN(index)) return;
  state.payments[index][field] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
  state.meta.dirty = true;
  renderTotals();
  renderReadiness();
  renderAccounting();
  renderTimeline();
  renderQuoteDocument();
  saveState();
}

function handleExpenseEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.expenseField;
  if (!field || Number.isNaN(index)) return;
  state.expenses[index][field] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
  state.meta.dirty = true;
  renderAccounting();
  renderExpenses();
  renderTimeline();
  renderJobDashboard();
  saveState();
}

function handleAccountingDraftEdit(event) {
  const type = event.target.dataset.accountingDraft;
  const field = event.target.dataset.accountingDraftField;
  if (!type || !field || !accountingDrafts[type]) return;
  accountingDrafts[type][field] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
}

function addAccountingDraft(type) {
  const draft = accountingDrafts[type];
  if (!draft) return;
  if (type === "payment") state.payments.unshift(defaultPayment(draft));
  if (type === "expense") state.expenses.unshift(defaultExpense(draft));
  accountingDrafts[type] = null;
  state.meta.dirty = true;
  render();
}

function handleAccountingDraftAction(event) {
  const addType = event.target.dataset.addAccountingDraft;
  const cancelType = event.target.dataset.cancelAccountingDraft;
  if (addType) {
    event.stopPropagation();
    addAccountingDraft(addType);
    return;
  }
  if (!cancelType) return;
  event.stopPropagation();
  accountingDrafts[cancelType] = null;
  renderPaymentDraftMenu();
  renderExpenseDraftMenu();
}

function handleChangeOrderEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.changeField;
  if (!field || Number.isNaN(index)) return;
  state.changeOrders[index][field] = event.target.type === "number" ? numberValue(event.target.value) : event.target.value;
  state.meta.dirty = true;
  renderTotals();
  renderReadiness();
  renderAccounting();
  renderJobDashboard();
  renderQuoteDocument();
  saveState();
}

function updateCollection(collection, index, field, value) {
  if (!collection[index]) return;
  collection[index][field] = value;
  state.meta.dirty = true;
  saveState();
}

function handleTaskEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.taskField;
  if (!field || Number.isNaN(index)) return;
  updateCollection(state.tasks, index, field, event.target.value);
  renderSchedule();
  renderReminders();
}

function handleJobMaterialEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.materialField;
  if (!field || Number.isNaN(index)) return;
  updateCollection(state.jobMaterials, index, field, event.target.value);
}

function handleSiteLogEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.siteLogField;
  if (!field || Number.isNaN(index)) return;
  updateCollection(state.siteLogs, index, field, event.target.value);
}

function handleCommunicationEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.commField;
  if (!field || Number.isNaN(index)) return;
  updateCollection(state.communications, index, field, event.target.value);
}

function handlePhotoEdit(event) {
  const index = Number(event.target.dataset.index);
  const field = event.target.dataset.photoField;
  if (!field || Number.isNaN(index)) return;
  updateCollection(state.photos, index, field, event.target.value);
}

function handleDashboardDraftEdit(event) {
  const type = event.target.dataset.draft;
  const field = event.target.dataset.draftField;
  if (!type || !field || !dashboardDrafts[type]) return;
  dashboardDrafts[type][field] = event.target.value;
}

function addDashboardDraft(type) {
  const draft = dashboardDrafts[type];
  if (!draft) return;
  if (type === "task") state.tasks.unshift(defaultTask(draft));
  if (type === "material") state.jobMaterials.unshift(defaultJobMaterial(draft));
  if (type === "siteLog") state.siteLogs.unshift(defaultSiteLog(draft));
  if (type === "communication") state.communications.unshift(defaultCommunication(draft));
  dashboardDrafts[type] = null;
  state.meta.dirty = true;
  renderJobDashboard();
  saveState();
}

function handleDashboardDraftAction(event) {
  const addType = event.target.dataset.addDraft;
  const cancelType = event.target.dataset.cancelDraft;
  if (addType) {
    event.stopPropagation();
    addDashboardDraft(addType);
    return;
  }
  if (!cancelType) return;
  event.stopPropagation();
  dashboardDrafts[cancelType] = null;
  renderDashboardDraftMenus();
}

function closeDashboardDraftMenus() {
  const hasOpenDraft = Object.values(dashboardDrafts).some(Boolean);
  if (!hasOpenDraft) return;
  dashboardDrafts.task = null;
  dashboardDrafts.material = null;
  dashboardDrafts.siteLog = null;
  dashboardDrafts.communication = null;
  renderDashboardDraftMenus();
}

function handleDashboardOutsideClick(event) {
  const dashboard = event.target.closest('[data-step="dashboard"]');
  if (!dashboard) return;
  const insideCreateMenu = event.target.closest(".ops-create-menu");
  const insideSavedCard = event.target.closest(".ops-card");
  const createButton = event.target.closest("#createTask, #createJobMaterial, #createSiteLog, #createCommunication");
  if (insideCreateMenu || insideSavedCard || createButton) return;
  closeDashboardDraftMenus();
  dashboard.querySelectorAll(".ops-card[open]").forEach(card => {
    card.open = false;
  });
}

function handleMaterialOutsideClick(event) {
  const entry = document.querySelector(".manual-material-entry");
  if (!entry?.open) return;
  if (event.target.closest(".manual-material-entry")) return;
  if (event.target.closest("[data-edit-material]")) return;
  entry.open = false;
}

function readPhotoFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addPhotoFiles(fileList) {
  const files = [...(fileList || [])].filter(file => file.type.startsWith("image/"));
  if (!files.length) return;
  try {
    const photos = await Promise.all(files.map(async file => defaultPhoto({
      filename: file.name,
      dataUrl: await readPhotoFile(file)
    })));
    state.photos.unshift(...photos);
    state.meta.dirty = true;
    renderPhotos();
    saveState();
  } catch {
    window.alert("One of the photos could not be added.");
  }
}

function confirmPrintIfNeeded() {
  const checks = readinessItems();
  const warnings = quoteWarnings();
  const blockers = checks.filter(item => !item.ok).map(item => item.label).concat(warnings);
  if (!blockers.length) return true;
  return window.confirm(`This quote needs review before sending:\n\n- ${blockers.join("\n- ")}\n\nContinue anyway?`);
}

function confirmNewClient() {
  if (!state.meta.dirty) return true;
  const saveFirst = window.confirm("Start a new quote? Your current quote has changes.\n\nChoose OK to save the current quote first. Choose Cancel for more options.");
  if (saveFirst) {
    archiveCurrentQuote("Draft");
    return true;
  }
  const continueWithoutSaving = window.confirm("Continue without saving the current quote?\n\nChoose OK to start fresh, or Cancel to keep working.");
  if (!continueWithoutSaving) return false;
  return true;
}

function confirmClearQuote() {
  return window.confirm("Clear the current quote?\n\nThis will erase the current working quote fields and start a fresh quote. Your saved archive will not be deleted.");
}

function duplicateArchivedQuote(id) {
  const record = archiveEntries().find(entry => entry.id === id);
  if (!record) return;
  Object.assign(state, JSON.parse(JSON.stringify(record.snapshot)));
  ensureStateShape();
  state.settings.quoteNumber = quoteNumber(sequenceForDate(todayISO()), new Date());
  state.settings.quoteDate = todayISO();
  state.settings.validUntil = futureISO(14);
  state.project.jobStatus = "Draft";
  state.meta = { finalized: false, dirty: true, archiveId: "", lastSavedAt: "" };
  activeStep = "start";
  render();
}

function exportArchiveBackup() {
  const blob = new Blob([JSON.stringify(archiveEntries(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `claybourne-quote-archive-${todayISO()}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importArchiveBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!Array.isArray(incoming)) throw new Error("Invalid backup");
      const existing = archiveEntries();
      const merged = [...incoming, ...existing].reduce((map, entry) => {
        if (entry?.id) map.set(entry.id, entry);
        return map;
      }, new Map());
      saveArchiveEntries([...merged.values()]);
      renderArchive();
    } catch {
      window.alert("That backup file could not be restored.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

async function afterSignInSync() {
  await syncMaterialsFromSupabase();
  await syncArchiveFromSupabase();
  await syncActiveQuoteFromSupabase();
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("authEmail")?.value.trim();
  const password = document.getElementById("authPassword")?.value;
  if (!email || !password) return;
  setAuthStatus("Signing in...");
  try {
    const session = await window.ClaybourneSupabase.signIn(email, password);
    updateAuthUI(session);
    setAuthStatus("");
    afterSignInSync();
  } catch (error) {
    setAuthStatus(error.message || "Sign in failed.", true);
  }
}

async function handleCreateAccount() {
  const email = document.getElementById("createEmail")?.value.trim();
  const password = document.getElementById("createPassword")?.value;
  const accessCode = document.getElementById("createAccessCode")?.value.trim();
  if (!email || !password || !accessCode) {
    setAuthStatus("Add email, password, and access code.", true, "createAuthStatus");
    return;
  }
  setAuthStatus("Checking access code...", false, "createAuthStatus");
  try {
    const session = await window.ClaybourneSupabase.signUp(email, password, accessCode);
    if (session) {
      updateAuthUI(session);
      setAuthStatus("", false, "createAuthStatus");
      afterSignInSync();
      return;
    }
    showSignInScreen();
    setAuthStatus("Account created. Check your email if Supabase requires confirmation, then sign in.");
  } catch (error) {
    setAuthStatus(error.message || "Account creation failed.", true, "createAuthStatus");
  }
}

async function handleSignOut() {
  try {
    await window.ClaybourneSupabase.signOut();
  } catch (error) {
    window.alert(error.message || "Sign out failed.");
  }
}

async function initAuth() {
  const bridge = window.ClaybourneSupabase;
  if (!bridge?.isAvailable()) {
    setAuthStatus("Supabase is not available. Check your internet connection.", true);
    updateAuthUI(null);
    return;
  }
  document.getElementById("authForm")?.addEventListener("submit", handleAuthSubmit);
  document.getElementById("createAccountButton")?.addEventListener("click", showCreateAccountScreen);
  document.getElementById("backToSignIn")?.addEventListener("click", showSignInScreen);
  document.getElementById("createAccountForm")?.addEventListener("submit", event => {
    event.preventDefault();
    handleCreateAccount();
  });
  document.getElementById("signOutButton")?.addEventListener("click", handleSignOut);
  bridge.onAuthStateChange((_event, session) => {
    updateAuthUI(session);
    if (isSignedInSession(session)) afterSignInSync();
  });
  let session = await bridge.getSession();
  if (session?.user?.is_anonymous) {
    await bridge.signOut();
    session = null;
  }
  updateAuthUI(session);
  if (isSignedInSession(session)) afterSignInSync();
}

loadState();
bindEvents();
render();
initAuth();
