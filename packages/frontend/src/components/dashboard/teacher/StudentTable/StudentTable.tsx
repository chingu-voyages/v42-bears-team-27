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
import Loader from 'src/components/common/Loader';
import { ThemeUIStyleObject } from 'theme-ui';

const columnHelper = createColumnHelper<any>();

// TODO add sorting by Surname
const columns = [
  columnHelper.accessor('surname', {
    header: () => 'Surname',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('forename', {
    header: () => 'Forename',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('numberTasks', {
    header: () => 'Tasks',
    cell: (info) => info.renderValue(),
  }),
];

const containerStyles: ThemeUIStyleObject = {
  width: [432, null, null, 480],
  height: 400,
  mt: [3, null, 0],
  border: '1px solid',
  borderColor: 'gray',
};

const StudentTable: React.FC = () => {
  const { data: classroomData, isLoading } = useSWR<IClassroom>(
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

  if (isLoading) {
    return (
      <div sx={{ position: 'relative', ...containerStyles }}>
        <Loader>Loading Table...</Loader>
      </div>
    );
  }

  return (
    <div sx={containerStyles}>
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
