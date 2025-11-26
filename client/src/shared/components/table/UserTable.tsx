import type { Column } from "../interfaces/ITableColumn";
import type { Action } from "../interfaces/ITableActions";

interface UserTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: Action<T>[];
}

export function UserTable<T>({ columns, data, actions }: UserTableProps<T>) {
    // Handle empty state
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-gray-500 text-sm mb-2">No users found</div>
                <div className="text-gray-600 text-xs">Try adjusting your filters or search</div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                {/* Table Header */}
                <thead>
                    <tr className="border-b border-neutral-800">
                        {columns.map((col) => (
                            <th
                                key={String(col.accessor)}
                                className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}

                        {actions && actions.length > 0 && (
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-neutral-800/50 hover:bg-white/[0.02] transition-colors"
                        >
                            {/* Render each column */}
                            {columns.map((col) => (
                                <td key={String(col.accessor)} className="py-3 px-4 text-sm text-gray-300">
                                    {col.render
                                        ? col.render(row)
                                        : (row[col.accessor] as React.ReactNode) || "-"}
                                </td>
                            ))}

                            {/* Render action buttons */}
                            {actions && actions.length > 0 && (
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {actions.map((action, actionIdx) => (
                                            <button
                                                key={`${action.label}-${actionIdx}`}
                                                onClick={() => action.onClick(row)}
                                                className={`px-3 py-1 rounded text-xs font-medium transition-all border ${action.className}`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}