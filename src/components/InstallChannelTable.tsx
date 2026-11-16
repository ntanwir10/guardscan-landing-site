import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { INSTALL_CHANNELS, type InstallChannel, type InstallChannelStatus } from "@/lib/install-channels";
import { cn } from "@/lib/utils";

const STATUS: Record<InstallChannelStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "border-terminal-green/40 bg-terminal-green/10 text-terminal-green" },
  publishing: { label: "Publishing", className: "border-border bg-muted text-muted-foreground" },
};

const StatusBadge = ({ status }: { status: InstallChannelStatus }) => (
  <Badge variant="outline" className={cn("whitespace-nowrap", STATUS[status].className)}>
    {STATUS[status].label}
  </Badge>
);

const Command = ({ channel, className }: { channel: InstallChannel; className?: string }) => (
  <code
    className={cn(
      "font-mono text-xs [overflow-wrap:anywhere]",
      channel.status === "live" ? "text-terminal-green" : "text-muted-foreground",
      className
    )}
  >
    {channel.command}
  </code>
);

export const InstallChannelTable = () => (
  <div className="space-y-3">
    {/* Narrow screens: one card per channel, so long commands get the full width. */}
    <ul className="space-y-3 md:hidden" aria-label="GuardScan availability by package manager">
      {INSTALL_CHANNELS.map((channel) => (
        <li key={channel.id} className="space-y-2 rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">{channel.label}</span>
            <StatusBadge status={channel.status} />
          </div>
          <p className="text-xs text-muted-foreground">{channel.platforms}</p>
          <Command channel={channel} className="block" />
        </li>
      ))}
    </ul>
    <div className="hidden md:block">
      <Table aria-label="GuardScan availability by package manager">
        <TableHeader>
          <TableRow>
            <TableHead>Package manager</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Install command</TableHead>
            <TableHead>Platforms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INSTALL_CHANNELS.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell className="align-top font-medium whitespace-nowrap">{channel.label}</TableCell>
              <TableCell className="align-top">
                <StatusBadge status={channel.status} />
              </TableCell>
              <TableCell className="align-top">
                <Command channel={channel} />
              </TableCell>
              <TableCell className="align-top text-muted-foreground">{channel.platforms}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <p className="text-sm text-muted-foreground">
      Status for GuardScan 1.1.1. Commands for channels that are not live yet start working when they go live.
    </p>
  </div>
);
