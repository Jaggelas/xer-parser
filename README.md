# xer-parser

A modern, browser-friendly TypeScript library to parse, inspect, and serialize Primavera P6 XER files. Designed for Node and the web with streaming support, strong typing, and calendar-aware utilities.

> Status: Actively evolving. APIs may change in minor releases.

## Features

- Pure ESM, works in Node and modern browsers
- Streaming parse (AsyncIterable) to avoid loading large files into memory
- High-fidelity round-trip serialization
  - Preserves original ERMHDR
  - Keeps table and column order
  - Appends required %E end marker
- Rich entities with utilities
  - `Tasks` collection helpers (filtering, compare, date range, etc.)
  - `Calendar` utilities for working time, durations, and snapping
- Type-safe schema registry to ensure constructor/property alignment
- Mutations: table-specific write-back helpers (update/insert/delete)
- Validation: `validate()` checks headers, duplicates, and referential integrity
- Validation: `validate({ autoRefresh })` returns machine-readable issues with codes, severity, and context
- `refreshEntities()` to rebuild entities after raw-table edits

## Installation

```sh
npm install xer-parser
```

## Quick start

Node (ESM):

```ts
import { readFile } from 'node:fs/promises';
import { XER } from 'xer-parser';

const text = await readFile('path/to/file.xer', 'utf8');
const xer = new XER(text);

console.log(xer.projects.length);
console.log(xer.tasks.normalTasks.length);
```

Browser (file upload):

```ts
import { XER } from 'xer-parser';

const input = document.querySelector('input[type=file]')!;
const file = input.files?.[0];
const text = await file!.text();
const xer = new XER(text);
console.log(xer.projects.length);
```

### Streaming

Node stream:

```ts
import { createReadStream } from 'node:fs';
import { XER, nodeReadableToAsyncIterable } from 'xer-parser';

const readable = createReadStream('path/to/file.xer');
const xer = await XER.fromStream(nodeReadableToAsyncIterable(readable));
```

Web ReadableStream:

```ts
import { XER, readableStreamToAsyncIterable } from 'xer-parser';

const webStream = file.stream(); // from a File or Response
const xer = await XER.fromStream(readableStreamToAsyncIterable(webStream));
```

### Serialize (save XER)

```ts
import { writeFile } from 'node:fs/promises';

// ... after parsing and updating entities
const out = xer.toXERString();
await writeFile('path/to/output.xer', out, 'utf8');
```

### Mutations and validation

Perform raw table edits through helpers, refresh entities if you rely on entity collections, and validate before saving:

```ts
import { XER } from 'xer-parser';

const xer = new XER(text);

// Update a task name
xer.updateTaskRow(1, { task_name: 'Updated' });

// Insert a resource and assign it to a task
xer.insertResourceRow({
  rsrc_id: 50,
  clndr_id: 10,
  rsrc_name: 'Welder',
  rsrc_short_name: 'WELD',
  rsrc_seq_num: 1,
  guid: 'guid-123',
  cost_qty_type: 'Q',
  def_qty_per_hr: 1,
  curr_id: 1,
  rsrc_type: 'L'
});
xer.insertTaskResourceRow({
  taskrsrc_id: 1000,
  task_id: 1,
  proj_id: 100,
  rsrc_id: 50,
  role_id: 1,
  remain_qty: 1,
  target_qty: 1,
  remain_qty_per_hr: 1,
  target_qty_per_hr: 1,
  cost_per_qty: 1,
  target_cost: 1,
  act_reg_cost: 0,
  act_ot_cost: 0
});

// Rebuild entity objects from raw tables when you need up-to-date collections
xer.refreshEntities();

// Validate referential integrity and basic structure (structured issues by default)
const issues = xer.validate();
// issues: Array<{ severity: 'error' | 'warn'; code: string; message: string; table?: string; id?: number | string; refTable?: string; refId?: number | string }>

// If you've just mutated raw tables and rely on entity-based checks, you can
// skip a separate refresh by passing autoRefresh
const refreshed = xer.validate({ autoRefresh: true });

// Finally, serialize back to XER text
const out = xer.toXERString();
```

### Common issues reported by validate()

The validator returns machine-readable objects with `severity`, `code`, and context fields. Below are common messages, what they mean, and typical fixes (shown as strings for readability):

| Example message | Meaning | How to fix |
| --- | --- | --- |
| `Task TK-002 references missing proj_id 999` | Task points to a non-existent project | Insert a PROJECT row with `proj_id=999` or update the task's `proj_id` to an existing one |
| `Task TK-002 references missing clndr_id 10` | Task calendar not found | Insert a CALENDAR with `clndr_id=10` or update the task's `clndr_id` |
| `Task TK-002 references missing wbs_id 1` | Task WBS node not found | Insert a PROJWBS row with `wbs_id=1` or update the task's `wbs_id` |
| `TASKRSRC references missing task_id 2` | Task assignment references missing task | Insert the TASK or remove/fix the TASKRSRC row |
| `TASKRSRC references missing rsrc_id 50` | Task assignment references missing resource | Insert the RSRC or update `rsrc_id` |
| `TASKPRED references missing pred_task_id 3` | Predecessor task does not exist | Insert the predecessor TASK or remove/fix the TASKPRED row |
| `RSRCRATE 400 references missing rsrc_id 1` | Resource rate row references missing resource | Insert RSRC `rsrc_id=1` or update the rate's `rsrc_id` |
| `RSRCROLE 500 references missing role_id 7` | Resource-role mapping references missing role | Insert ROLES `role_id=7` or update the RSRCROLE row |
| `ROLERATE 11 references missing role_id 999` | Role-rate row references missing role | Insert ROLES `role_id=999` or update the rate's `role_id` |
| `RSRCLEVELLIST 300 references missing schedoptions_id 200` | Leveling list references missing schedule options | Insert SCHEDOPTIONS `schedoptions_id=200` or update the list row |
| `SCHEDOPTIONS 200 references missing proj_id 999` | Schedule options point to a missing project | Insert PROJECT `proj_id=999` or fix the options row |
| `ACTVCODE 123 missing actv_code_type_id 5` | Activity code type missing | Insert ACTVTYPE `actv_code_type_id=5` or update the ACTVCODE row |
| `ACTVCODE 124 missing parent_actv_code_id 100` | Activity code parent missing | Insert parent ACTVCODE `actv_code_id=100` or clear the parent reference |
| `UDFVALUE missing udf_type_id 7` | UDF value type missing | Insert UDFTYPE `udf_type_id=7` or update/remove the UDFVALUE row |
| `Duplicate TASK.task_id: 1, 2` | Duplicate task IDs in TASK table | Ensure each `task_id` is unique |
| `TASK missing column: task_name` | Required header not present | Add the missing column to the `%F` header of the TASK table |

Notes:
- After using write-back helpers, call `refreshEntities()` if you rely on entity-based collections (e.g., roles/resources) for validation—or pass `validate({ autoRefresh: true })` to refresh inside the call. Some checks (like TASK orphan checks) read raw tables and don’t require a refresh.

### Gotchas: refreshEntities() vs raw-table reads

- Source of truth: raw tables. Write-back helpers mutate raw tables immediately.
- Serialization: `toXERString()` uses raw tables; you can save without calling `refreshEntities()`.
- Entity-dependent validation: checks that rely on entity arrays (e.g., ROLES/RSRC/ACTVCODE/UDFTYPE) require `refreshEntities()` after edits to be reflected in `validate()`.
- Raw-table validation: some checks read tables directly (e.g., TASK orphans), so they reflect write-backs without a refresh.
- Performance tip: for many edits, batch your updates, then call `refreshEntities()` once.

## API overview

Core class: `XER`

- `new XER(text: string)` — parse from a full string
- `static fromStream(source: AsyncIterable<string | Uint8Array>)` — parse from a stream
- `toXERString(options?: { version?: number; lineEnding?: '\\r\\n' | '\\n' })` — serialize back to XER text
- Entity properties (arrays unless stated): `projects`, `tasks` (Tasks collection), `calendars`, `resources`, `activityCodeTypes`, `activityCodes`, `taskResources`, `taskPredecessors`, `taskMemos`, `taskActivityCodes`, `udfTypes`, `udfValues`, etc.

Write-back helpers (subset):

- Tasks: `updateTaskRow`, `insertTaskRow`, `deleteTaskRow`
- Projects/Calendars: `updateProjectRow`, `insertProjectRow`, ..., `updateCalendarRow`, ...
- Resources: `updateResourceRow`, `insertResourceRow`, `deleteResourceRow`
- Task links: `updateTaskResourceRow`, `insertTaskResourceRow`, `deleteTaskResourceRow`
- Activity codes: `updateActivityCodeRow`, `insertActivityCodeRow`, `deleteActivityCodeRow`
- UDFs: `updateUdfValueRow`, `insertUdfValueRow`, `deleteUdfValueRows`, `updateUdfTypeRow`, ...
- Roles and rates: `updateRoleRow`, `insertRoleRow`, `updateRoleRateRow`, `insertRoleRateRow`, `updateResourceRoleRow`, ...
- Leveling/schedule: `updateResourceLevelListRow`, `updateScheduleOptionRow`, ...

Other:
 

- `refreshEntities()` — rebuilds entity arrays from raw tables
- `validate(options?: { autoRefresh?: boolean }): ValidationIssue[]` — structured issues with codes and context

Validation types are exported:

- `ValidationIssue`
- `ValidationSeverity`
 
- `ValidateOptions`

Tasks collection: `Tasks extends Array<Task>`

- Filters: `milestoneTasks`, `normalTasks`, `levelOfEffortTasks`, `completed`, `inProgress`, `notStarted`
- Date ranges: `getMinDate(key)`, `getMaxDate(key)`
- Diff/compare: `compareTasks(other)`, `addedTasks(other)`, `removedTasks(other)`, `overlaps(other)`

Calendar utilities: `Calendar`

- `isWorkingDay(date)`, `isWorkingHour(date)`
- `getWorkingShifts(date)` → intervals for the day
- `duration(from, to)` → working-hours `Duration`
- `addToDate(from, qty, unit)` — working-time add with exceptions/shifts
- `workingHoursBetween(from, to, precision)` — hours or minutes (sign-aware)
- `nextWorkingMoment(date, inclusive)`, `clampToWorking(date, mode)`
- `unitConvert(from, to, value)` — calendar-specific conversion

## Performance at scale

- Exception lookups are O(1): exceptions are pre-indexed by date (YYYY-MM-DD) during parse and used by `isWorkingDay` and `getWorkingShifts`.
- Calendar arithmetic iterates only across concrete working intervals to minimize scanning.

Benchmarks (micro)

Run a small local benchmark to gauge heavy operations across large ranges:

```powershell
npm run build
npm run bench
```

Notes (indicative; varies by hardware):

- addToDate 1,000h x100 iters: completes in tens of milliseconds total.
- addToDate 10,000h x20 iters: typically under a second total.
- workingHoursBetween across 180/365 days x multiple iters: remains responsive due to interval clipping.

## Schema registry and type safety

The loader uses a strongly-typed registry (`src/schemas/schema-registry.ts`) to wire XER tables to entity classes. This enforces constructor and property alignment at compile time.

Adding a schema:

1) Create `src/schemas/MySchema.ts` with constructor `(xer, header, row)`
2) Add its collection to `XERData` if needed (`src/types/schema.ts`)
3) Register it in `schema-registry.ts`: `{ table, key, ctor, wrap? }`

## Compatibility

- Module format: ESM only
- Node: 18+ recommended
- Browsers: modern (supports ES2020 and ReadableStream if streaming)

## Contributing

Issues and PRs are welcome. Please include a minimal XER sample (scrub sensitive data) when reporting parser issues.

## License

MIT
