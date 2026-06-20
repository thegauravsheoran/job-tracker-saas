"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Plus,
  MoreHorizontal,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { MOCK_APPLICATIONS } from "@/data/mock-applications";
import { APPLICATION_STATUS_CONFIG, WORK_MODE_OPTIONS } from "@/lib/constants";
import { formatDate, formatSalary } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types/application";

type SortField = "companyName" | "jobTitle" | "appliedAt" | "status";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 8;

const STATUS_FILTER_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "bookmarked", label: "Bookmarked" },
  { value: "applying", label: "Applying" },
  { value: "applied", label: "Applied" },
  { value: "screening", label: "Screening" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

// ─── Company Logo Cell ────────────────────────────────────────────────────────
function CompanyLogo({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted overflow-hidden">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="size-7 object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-bold text-muted-foreground">
          {name[0]?.toUpperCase()}
        </span>
      )}
    </div>
  );
}

// ─── Sortable Header ──────────────────────────────────────────────────────────
function SortableHeader({
  label,
  field,
  sortField,
  sortDir,
  onSort,
}: {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
}) {
  const active = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      {active ? (
        sortDir === "asc" ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )
      ) : (
        <ArrowUpDown className="size-3 opacity-40" />
      )}
    </button>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────
function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:text-destructive">
        <X className="size-3" />
      </button>
    </span>
  );
}

// ─── Table Row Skeleton ───────────────────────────────────────────────────────
function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// ─── Work Mode Badge ──────────────────────────────────────────────────────────
function WorkModeBadge({ mode }: { mode: string }) {
  const colors: Record<string, string> = {
    remote: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950",
    hybrid: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    onsite: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", colors[mode] ?? "bg-muted text-muted-foreground")}>
      {mode}
    </span>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export function ApplicationsView() {
  const [search, setSearch] = useState("");
  const [statusFilters, setStatusFilters] = useState<ApplicationStatus[]>([]);
  const [workModeFilter, setWorkModeFilter] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("appliedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Dummy loading on mount
  const [loading] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const toggleStatusFilter = (status: ApplicationStatus) => {
    setStatusFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
    setPage(1);
  };

  const toggleWorkModeFilter = (mode: string) => {
    setWorkModeFilter((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let apps: Application[] = [...MOCK_APPLICATIONS];

    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.companyName.toLowerCase().includes(q) ||
          a.jobTitle.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
      );
    }

    if (statusFilters.length > 0) {
      apps = apps.filter((a) => statusFilters.includes(a.status));
    }

    if (workModeFilter.length > 0) {
      apps = apps.filter((a) => workModeFilter.includes(a.workMode));
    }

    apps.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";
      switch (sortField) {
        case "companyName":
          aVal = a.companyName;
          bVal = b.companyName;
          break;
        case "jobTitle":
          aVal = a.jobTitle;
          bVal = b.jobTitle;
          break;
        case "appliedAt":
          aVal = a.appliedAt ?? a.createdAt;
          bVal = b.appliedAt ?? b.createdAt;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return apps;
  }, [search, statusFilters, workModeFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount = statusFilters.length + workModeFilter.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          Add Application
        </Button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search company, role, location..."
              className="pl-9 h-9"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", showFilters && "bg-accent")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="size-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-0.5 h-4 min-w-4 px-1 text-[9px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowUpDown className="size-3.5" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["companyName", "jobTitle", "appliedAt", "status"] as SortField[]).map(
                (f) => (
                  <DropdownMenuItem
                    key={f}
                    onClick={() => handleSort(f)}
                    className={cn(sortField === f && "bg-accent")}
                  >
                    {f === "companyName" ? "Company" : f === "jobTitle" ? "Job Title" : f === "appliedAt" ? "Date Applied" : "Status"}
                    {sortField === f && (
                      <span className="ml-auto text-xs text-muted-foreground capitalize">
                        {sortDir}
                      </span>
                    )}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUS_FILTER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => toggleStatusFilter(opt.value)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                          statusFilters.includes(opt.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        )}
                      >
                        {APPLICATION_STATUS_CONFIG[opt.value].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Work Mode</p>
                  <div className="flex gap-1.5">
                    {WORK_MODE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => toggleWorkModeFilter(opt.value)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                          workModeFilter.includes(opt.value)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStatusFilters([]);
                        setWorkModeFilter([]);
                        setPage(1);
                      }}
                      className="h-7 text-xs text-muted-foreground"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((s) => (
              <FilterPill
                key={s}
                label={APPLICATION_STATUS_CONFIG[s].label}
                onRemove={() => toggleStatusFilter(s)}
              />
            ))}
            {workModeFilter.map((m) => (
              <FilterPill
                key={m}
                label={m.charAt(0).toUpperCase() + m.slice(1)}
                onRemove={() => toggleWorkModeFilter(m)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Company"
                    field="companyName"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Role"
                    field="jobTitle"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </th>
                <th className="hidden md:table-cell px-4 py-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">Location</span>
                </th>
                <th className="hidden lg:table-cell px-4 py-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">Salary</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Applied"
                    field="appliedAt"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader
                    label="Status"
                    field="status"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                </th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))
                : paginated.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <EmptyState
                          icon={Briefcase}
                          title="No applications found"
                          description="Try adjusting your search or filters to find what you're looking for."
                          className="border-0"
                        />
                      </td>
                    </tr>
                  )
                  : paginated.map((app, i) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors group"
                      >
                        {/* Company */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <CompanyLogo
                              src={app.companyLogo}
                              name={app.companyName}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {app.companyName}
                              </p>
                              <div className="hidden sm:flex items-center gap-1 mt-0.5">
                                <WorkModeBadge mode={app.workMode} />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-sm text-foreground truncate max-w-48">
                              {app.jobTitle}
                            </p>
                            <p className="text-[10px] text-muted-foreground capitalize">
                              {app.employmentType}
                            </p>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="hidden md:table-cell px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" />
                            <span className="truncate max-w-28">{app.location}</span>
                          </div>
                        </td>

                        {/* Salary */}
                        <td className="hidden lg:table-cell px-4 py-3">
                          <span className="text-xs text-muted-foreground">
                            {formatSalary(app.salary)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground">
                            {app.appliedAt
                              ? formatDate(app.appliedAt)
                              : "—"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <StatusBadge status={app.status} size="sm" />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              {app.jobUrl && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={app.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <ExternalLink className="size-3.5" />
                                    View job posting
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="size-3.5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={page === p ? "default" : "ghost"}
                  size="icon"
                  className="size-7 text-xs"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
