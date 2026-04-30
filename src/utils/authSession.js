const PENDING_AUTH_REDIRECT_KEY = "store_pending_auth_redirect";
const SESSION_EXPIRED_NOTICE_KEY = "store_session_expired_notice";
const BLOCKED_REDIRECT_PATHS = new Set(["/login", "/signup", "/register", "/logout"]);

const readSessionStorageValue = (key) => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        return window.sessionStorage.getItem(key);
    } catch {
        return null;
    }
};

const writeSessionStorageValue = (key, value) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.sessionStorage.setItem(key, value);
    } catch {
        // Ignore session storage failures and keep auth flow moving.
    }
};

const removeSessionStorageValue = (key) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.sessionStorage.removeItem(key);
    } catch {
        // Ignore session storage failures and keep auth flow moving.
    }
};

const normalizeRedirectPath = (path) => {
    if (!path || typeof path !== "string") {
        return "/";
    }

    const trimmedPath = path.trim();

    if (!trimmedPath.startsWith("/")) {
        return "/";
    }

    const [pathname] = trimmedPath.split("?");

    if (BLOCKED_REDIRECT_PATHS.has(pathname)) {
        return "/";
    }

    return trimmedPath;
};

const getSafeRedirectPath = (locationState, fallbackPath = "/") => {
    const redirectSource = locationState?.from;

    if (redirectSource?.pathname) {
        return normalizeRedirectPath(`${redirectSource.pathname}${redirectSource.search || ""}`);
    }

    return normalizeRedirectPath(fallbackPath);
};

const storePendingAuthRedirect = (path) => {
    const safePath = normalizeRedirectPath(path);

    if (safePath === "/") {
        removeSessionStorageValue(PENDING_AUTH_REDIRECT_KEY);
        return;
    }

    writeSessionStorageValue(PENDING_AUTH_REDIRECT_KEY, safePath);
};

const consumePendingAuthRedirect = () => {
    const storedPath = readSessionStorageValue(PENDING_AUTH_REDIRECT_KEY);
    removeSessionStorageValue(PENDING_AUTH_REDIRECT_KEY);
    return normalizeRedirectPath(storedPath || "/");
};

const markSessionExpiredNotice = () => {
    writeSessionStorageValue(SESSION_EXPIRED_NOTICE_KEY, "1");
};

const consumeSessionExpiredNotice = () => {
    const notice = readSessionStorageValue(SESSION_EXPIRED_NOTICE_KEY);
    removeSessionStorageValue(SESSION_EXPIRED_NOTICE_KEY);
    return notice === "1";
};

const buildCurrentRedirectPath = () => {
    if (typeof window === "undefined") {
        return "/";
    }

    return normalizeRedirectPath(
        `${window.location.pathname || "/"}${window.location.search || ""}${window.location.hash || ""}`,
    );
};

const isAuthRoutePath = (pathname) => {
    return BLOCKED_REDIRECT_PATHS.has(pathname);
};

export {
    buildCurrentRedirectPath,
    consumePendingAuthRedirect,
    consumeSessionExpiredNotice,
    getSafeRedirectPath,
    isAuthRoutePath,
    markSessionExpiredNotice,
    storePendingAuthRedirect,
};
