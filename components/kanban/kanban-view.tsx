"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, GripVertical, MapPin, Banknote, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { MOCK_APPLICATIONS } from "@/data/mock-applications";
import { formatDateShort, formatSalary } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types/application";

interface KanbanColumnDef {
  id: ApplicationStatus;
  label: string;
  accent: string;
  headerBg: string;
  countBg: string;
}

const COLUMNS: KanbanColumnDef[] = [
  {
    id: "bookmarked",
    label: "Wishlist",
    accent: "border-slate-400",
    headerBg: "bg-slate-500/10",
    countBg: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  {
    id: "applied",
    label: "Applied",
    accent: "border-blue-400",
    headerBg: "bg-blue-500/10",
    countBg: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    id: "screening",
    label: "OA / Screen",
    accent: "border-yellow-400",
    headerBg: "bg-yellow-500/10",
    countBg: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
  },
  {
    id: "interviewing",
    label: "Interview",
    accent: "border-orange-400",
    headerBg: "bg-orange-500/10",
    countBg: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    id: "offer",
    label: "Offer",
    accent: "border-emerald-400",
    headerBg: "bg-emerald-500/10",
    countBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  {
    id: "rejected",
    label: "Rejected",
    accent: "border-red-400",
    headerBg: "bg-red-500/10",
    countBg: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
];

// ─── Company Logo ─────────────────────────────────────────────────────────────
function CardLogo({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted overflow-hidden">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-6 object-contain" onError={() => setFailed(true)} />
      ) : (
        <span className="text-xs font-bold text-muted-foreground">{name[0]}</span>
      )}
    </div>
  );
}

// ─── Kanban Card ──────────────────────────────────────────────────────────────
function KanbanCard({
  app,
  onDragStart,
  isDragging,
}: {
  app: Application;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  isDragging: boolean;
}) {
  const interviewCount = app.interviews.length;
  const upcomingInterview = app.interviews.find((i) => i.outcome === "pending");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 0.98 : 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent<HTMLDivElement>, app.id)}
      className={cn(
        "group rounded-xl border border-border bg-card p-3 shadow-sm cursor-grab active:cursor-grabbing",
        "hover:border-primary/30 hover:shadow-md transition-all duration-150",
        isDragging && "opacity-50 ring-2 ring-primary/30"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <div className="mt-0.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
          <GripVertical className="size-3.5" />
        </div>
        <CardLogo src={app.companyLogo} name={app.companyName} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-card-foreground leading-snug truncate">
            {app.companyName}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">{app.jobTitle}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-6 opacity-0 group-hover:opacity-100 shrink-0">
              <MoreHorizontal className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Details */}
      <div className="space-y-1.5 ml-5">
        {app.salary?.disclosed && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Banknote className="size-3" />
            <span>{formatSalary(app.salary)}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin className="size-3" />
          <span className="truncate">{app.location}</span>
        </div>
        {upcomingInterview && (
          <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400">
            <Calendar className="size-3" />
            <span>{formatDateShort(upcomingInterview.scheduledAt)}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 ml-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {app.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {interviewCount > 0 && (
            <span className="text-[9px] text-muted-foreground">
              {interviewCount} interview{interviewCount > 1 ? "s" : ""}
            </span>
          )}
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[9px] font-medium",
              app.priority === "high" && "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
              app.priority === "medium" && "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
              app.priority === "low" && "bg-muted text-muted-foreground"
            )}
          >
            {app.priority}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Kanban Column ────────────────────────────────────────────────────────────
function KanbanColumn({
  column,
  cards,
  dragOverColumn,
  draggingId,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  column: KanbanColumnDef;
  cards: Application[];
  dragOverColumn: string | null;
  draggingId: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, colId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, colId: string) => void;
}) {
  const isOver = dragOverColumn === column.id;

  return (
    <div
      className="flex w-64 shrink-0 flex-col rounded-xl border border-border bg-muted/20"
      onDragOver={(e) => onDragOver(e, column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
    >
      {/* Column header */}
      <div className={cn("flex items-center justify-between rounded-t-xl border-b border-border px-3 py-2.5", column.headerBg)}>
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full border-l-4 pl-1.5 text-xs font-semibold text-foreground", column.accent)}>
            {column.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("flex size-5 items-center justify-center rounded-full text-[10px] font-bold", column.countBg)}>
            {cards.length}
          </span>
          <Button variant="ghost" size="icon" className="size-5 opacity-0 group-hover:opacity-100">
            <Plus className="size-3" />
          </Button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          "flex-1 space-y-2 p-2 min-h-[120px] transition-colors duration-150 rounded-b-xl",
          isOver && draggingId
            ? "bg-primary/5 ring-2 ring-inset ring-primary/20"
            : ""
        )}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              app={card}
              onDragStart={onDragStart}
              isDragging={draggingId === card.id}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className={cn(
            "flex h-16 items-center justify-center rounded-lg border-2 border-dashed",
            isOver && draggingId ? "border-primary/50" : "border-border"
          )}>
            <p className="text-[10px] text-muted-foreground">
              {isOver && draggingId ? "Drop here" : "No applications"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Kanban View ─────────────────────────────────────────────────────────
export function KanbanView() {
  const [columns, setColumns] = useState<Record<string, Application[]>>(() => {
    const grouped: Record<string, Application[]> = {};
    COLUMNS.forEach((col) => {
      grouped[col.id] = MOCK_APPLICATIONS.filter((a) => a.status === col.id);
    });
    return grouped;
  });

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const sourceColumnRef = useRef<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    sourceColumnRef.current =
      Object.keys(columns).find((colId) =>
        columns[colId].some((a) => a.id === id)
      ) ?? null;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    colId: string
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(colId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColId: string
  ) => {
    e.preventDefault();
    const srcColId = sourceColumnRef.current;
    if (!draggingId || !srcColId || srcColId === targetColId) {
      setDraggingId(null);
      setDragOverColumn(null);
      return;
    }

    setColumns((prev) => {
      const movedApp = prev[srcColId]?.find((a) => a.id === draggingId);
      if (!movedApp) return prev;
      return {
        ...prev,
        [srcColId]: prev[srcColId].filter((a) => a.id !== draggingId),
        [targetColId]: [
          ...prev[targetColId],
          { ...movedApp, status: targetColId as ApplicationStatus },
        ],
      };
    });

    setDraggingId(null);
    setDragOverColumn(null);
    sourceColumnRef.current = null;
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverColumn(null);
    sourceColumnRef.current = null;
  };

  const totalApps = Object.values(columns).reduce(
    (sum, col) => sum + col.length,
    0
  );

  return (
    <div
      className="flex flex-col gap-5 h-full"
      onDragEnd={handleDragEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kanban Board</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {totalApps} applications across {COLUMNS.length} stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
            {COLUMNS.map((col) => (
              <div key={col.id} className="flex items-center gap-1">
                <div className={cn("size-2 rounded-full border-l-2", col.accent)} />
                <span>{col.label}</span>
                <span className="font-semibold text-foreground">
                  {columns[col.id]?.length ?? 0}
                </span>
              </div>
            ))}
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 flex-1">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            cards={columns[column.id] ?? []}
            dragOverColumn={dragOverColumn}
            draggingId={draggingId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
