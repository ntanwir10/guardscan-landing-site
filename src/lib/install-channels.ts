/** live: installable today. moderation: submitted, waiting for the registry's reviewers. publishing: the release is still publishing it. */
export type InstallChannelStatus = "live" | "moderation" | "publishing";

export interface InstallChannel {
  id: string;
  label: string;
  command: string;
  /** Only live channels render as install commands. Update when the release ledger records the channel as verified. */
  status: InstallChannelStatus;
  platforms: string;
  /** Installs the standalone binary, which bundles Node.js. */
  standalone: boolean;
}

export const INSTALL_CHANNELS: InstallChannel[] = [
  { id: "npm", label: "npm", command: "npm install -g guardscan", status: "live", platforms: "Any OS with Node.js 22+", standalone: false },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g guardscan", status: "live", platforms: "Any OS with Node.js 22+", standalone: false },
  { id: "yarn", label: "Yarn", command: "yarn global add guardscan", status: "live", platforms: "Any OS with Node.js 22+", standalone: false },
  { id: "bun", label: "Bun", command: "bun add -g guardscan", status: "live", platforms: "Any OS with Node.js 22+", standalone: false },
  // Current Homebrew refuses third-party tap formulae until they are trusted.
  { id: "brew", label: "Homebrew", command: "brew tap ntanwir10/tap && brew trust --formula ntanwir10/tap/guardscan && brew install ntanwir10/tap/guardscan", status: "live", platforms: "macOS arm64/x64, Linux arm64/x64 (glibc)", standalone: true },
  { id: "scoop", label: "Scoop", command: "scoop bucket add guardscan https://github.com/ntanwir10/homebrew-tap && scoop install guardscan", status: "live", platforms: "Windows x64", standalone: true },
  { id: "pipx", label: "pipx (PyPI)", command: "pipx install guardscan-cli", status: "publishing", platforms: "macOS arm64/x64, Linux x86_64/aarch64, Windows x64", standalone: true },
  { id: "winget", label: "WinGet", command: "winget install NaumanTanwir.GuardScan", status: "publishing", platforms: "Windows x64", standalone: true },
  { id: "choco", label: "Chocolatey", command: "choco install guardscan", status: "moderation", platforms: "Windows x64", standalone: true },
];

export const LIVE_INSTALL_CHANNELS = INSTALL_CHANNELS.filter((c) => c.status === "live");
export const LIVE_STANDALONE_CHANNELS = LIVE_INSTALL_CHANNELS.filter((c) => c.standalone);
