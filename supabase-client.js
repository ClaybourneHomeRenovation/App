(function () {
  const SUPABASE_URL = "https://hhvpqnyqdacdqrnemqcg.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1ccS18zhLdgdp_0UUK6w0Q_iwR6NmyY";

  function createClient() {
    if (!window.supabase?.createClient) return null;
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true
      }
    });
  }

  const client = createClient();

  async function ensureSession() {
    if (!client) return null;
    const { data: current } = await client.auth.getSession();
    if (current?.session && !current.session.user?.is_anonymous && current.session.user?.email) return current.session;
    throw new Error("Please sign in to sync with Supabase.");
  }

  async function signIn(email, password) {
    if (!client) throw new Error("Supabase is not available.");
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  }

  async function validateAccessCode(email, accessCode) {
    if (!client) throw new Error("Supabase is not available.");
    const { data, error } = await client.rpc("use_signup_access_code", {
      input_email: email,
      input_code: accessCode
    });
    if (error) throw error;
    if (!data) throw new Error("Access code is invalid, expired, or already used.");
    return true;
  }

  async function signUp(email, password, accessCode) {
    if (!client) throw new Error("Supabase is not available.");
    await validateAccessCode(email, accessCode);
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) throw error;
    return data.session;
  }

  async function signOut() {
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async function getSession() {
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session || null;
  }

  window.ClaybourneSupabase = {
    client,
    isAvailable: () => Boolean(client),
    ensureSession,
    signIn,
    signUp,
    validateAccessCode,
    signOut,
    getSession,
    onAuthStateChange(callback) {
      return client?.auth.onAuthStateChange(callback);
    }
  };
})();
