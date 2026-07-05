import type { CSSProperties } from "react";

export const metadata = {
  title: "Protected",
};

export default function UnlockPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "1";

  return (
    <main style={styles.page}>
      <section style={styles.panel} aria-labelledby="unlock-title">
        <p style={styles.kicker}>Private page</p>
        <h1 id="unlock-title" style={styles.title}>
          Enter the password
        </h1>
        <p style={styles.copy}>
          This site is private. The page content and media stay unavailable until
          the password is accepted.
        </p>
        <form action="/api/auth" method="post" style={styles.form}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            style={styles.input}
          />
          {hasError ? (
            <p role="alert" style={styles.error}>
              That password did not work.
            </p>
          ) : null}
          <button type="submit" style={styles.button}>
            Unlock
          </button>
        </form>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "#16110d",
    color: "#fff8e7",
    fontFamily:
      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },
  panel: {
    width: "100%",
    maxWidth: "420px",
    border: "1px solid rgba(255, 248, 231, 0.22)",
    borderRadius: "8px",
    padding: "28px",
    background: "rgba(255, 248, 231, 0.08)",
    boxShadow: "0 24px 90px rgba(0, 0, 0, 0.36)",
  },
  kicker: {
    margin: "0 0 10px",
    color: "#f3bd73",
    fontSize: "12px",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "34px",
    lineHeight: 1.05,
    fontWeight: 650,
  },
  copy: {
    margin: "14px 0 24px",
    color: "rgba(255, 248, 231, 0.78)",
    lineHeight: 1.5,
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    color: "rgba(255, 248, 231, 0.84)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 248, 231, 0.28)",
    borderRadius: "6px",
    padding: "12px 13px",
    background: "rgba(0, 0, 0, 0.28)",
    color: "#fff8e7",
    fontSize: "16px",
  },
  error: {
    margin: 0,
    color: "#ffb4a8",
    fontSize: "14px",
  },
  button: {
    border: 0,
    borderRadius: "6px",
    padding: "12px 16px",
    background: "#f3bd73",
    color: "#16110d",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },
};
