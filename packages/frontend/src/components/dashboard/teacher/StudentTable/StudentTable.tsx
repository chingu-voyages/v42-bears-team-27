import { useMemo } from 'react';
import useSWR from 'swr';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import type { IClassroom } from 'src/interfaces';
import { fetcher } from 'src/services';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('fullName', {
    header: () => 'Full Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('numberTasks', {
    header: () => 'Tasks',
    cell: (info) => info.renderValue(),
  }),
];

const StudentTable: React.FC = () => {
  const { data: classroomData } = useSWR<IClassroom>(
    '/api/v0/classroom',
    fetcher,
  );

  const studentsData = useMemo(() => {
    if (!classroomData) {
      return [];
    }

    return [...classroomData.students].map((student) => {
      const numberOfTaskUncompleted = student.tasks.filter(
        (task) => task.completed === false,
      ).length;

      return {
        ...student,
        numberTasks: numberOfTaskUncompleted,
      };
    });
  }, [classroomData]);

  const table = useReactTable({
    data: studentsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      sx={{
        width: [432, null, null, 480],
        height: 400,
        mt: [3, null, 0],
        mr: [null, null, 3],
        mx: [null, 'auto', null],
        border: '1px solid',
        borderColor: 'gray',
      }}
    >
      <table sx={{ width: '100%', height: '50%', borderCollapse: 'collapse' }}>
        <thead sx={{ py: 2, px: 3, bg: 'primary' }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              sx={{
                variant: 'text.label',
                fontFamily: 'heading',
                fontSize: 1,
                color: 'white',
              }}
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              sx={{
                variant: 'text.label',
                textAlign: 'center',
                '&:nth-last-of-type(2n)': {
                  bg: 'muted',
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
