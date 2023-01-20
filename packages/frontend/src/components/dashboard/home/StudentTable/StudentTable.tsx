import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Props = {
  data: any[];
  columns: any[];
};

const StudentTable: React.FC<Props> = ({ data, columns }) => {
  const table = useReactTable({
    data,
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
        <thead
          sx={{
            py: 2,
            px: 3,
            bg: 'primary',
          }}
        >
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
                '&:nth-child(2n)': {
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
