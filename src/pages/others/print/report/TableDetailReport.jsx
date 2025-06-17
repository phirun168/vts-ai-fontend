import dayjs from 'dayjs'
import { forwardRef } from 'react'
const PrintableTable = forwardRef(({ data }, ref) => {
  const { data_print } = data
  const { total_count_report } = data_print || {}
  const transformReportData = (report) => {
    // Check if report is defined and is an object
    if (report && typeof report === 'object') {
      return Object.keys(report).map((key) => ({
        name:
          key === 'count_a'
            ? 'Absent'
            : key === 'count_al'
              ? 'Annual Leave'
              : key === 'count_ul'
                ? 'Unpaid Leave'
                : key === 'count_ms'
                  ? 'Missed Scan'
                  : key === 'count_l'
                    ? 'Late'
                    : key,
        count:
          key === 'count_a'
            ? 'Days'
            : key === 'count_al'
              ? 'Days'
              : key === 'count_ul'
                ? 'Days'
                : key === 'count_ms'
                  ? 'Times'
                  : key === 'count_l'
                    ? 'Times'
                    : key,
        value: report[key],
      }))
    }
    // Return an empty array if report is undefined or null

    return []
  }

  // Transform the data
  const resultTotalCount = transformReportData(total_count_report)

  return (
    <div
      ref={ref}
      style={{
        visibility: 'visible',
        position: 'absolute',
        left: 0,
        top: '0cm',
        bottom: '3cm',
        width: '21cm',
        height: ' 29.7cm',
        paddingLeft: '1cm',
        paddingRight: '1cm',
        fontFamily: 'Times New Roman',
      }}
    >
      <div
        ref={ref}
        style={{
          visibility: 'visible',
          position: 'absolute',
          left: 0,
          top: '0cm',
          bottom: '3cm',
          width: '21cm',
          height: ' 29.7cm',
          paddingLeft: '1cm',
          paddingRight: '1cm',
          fontFamily: 'Times New Roman',
        }}
      >
        <style>
          {`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          .page-break {
            page-break-before: always;
          }
          th, td {
            font-size: 10px;
          }
          th {
            background: #AACC92;
          }
          .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0px;
          }
          .summary-table td {
            border: solid 1px black;
            padding: 4px;
          }
          thead {
            display: table-row-group;
          }

        }
      `}
        </style>

        <div
          style={{
            background: '#AACC92',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            fontSize: '10px',
          }}
          className='text-center py-2 font-bold'
        >
          <span>FINGER PRINT </span>
          {/* <span>{current_month?.date_name}</span> */}
        </div>

        <table
          className='min-w-full  '
          style={{ border: '1px solid black', borderCollapse: 'collapse' }}
        >
          <thead style={{ background: '#AACC92' }}>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '4%',
                }}
                scope='col'
                className=' py-2	 tracking-wider font-bold  uppercase'
              >
                Nº
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '9%',
                }}
                scope='col'
                className='	py-2 tracking-wider font-bold  uppercase'
              >
                ID
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '20%',
                }}
                scope='col'
                className='	py-2 tracking-wider font-bold  uppercase'

                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                NAME
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '5%',
                }}
                scope='col'
                className='py-2	 tracking-wider font-bold  uppercase'

                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                DAY
              </th>
              <th
                className='py-2	 tracking-wider font-bold  uppercase'
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '10%',
                }}
                scope='col'

                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                DATE
              </th>
              <th
                className='py-2	 tracking-wider font-bold  uppercase'
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '10%',
                }}
                scope='col'
                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                CLOCK IN
              </th>
              <th
                className='py-2	 tracking-wider font-bold  uppercase'
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '10%',
                }}
                scope='col'

                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                CLOCK OUT
              </th>
              <th
                className='	py-2 tracking-wider font-bold  uppercase'
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '10%',
                }}
                scope='col'
                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                NOTE
              </th>
              <th
                className='	py-2 tracking-wider font-bold  uppercase'
                style={{
                  border: '1px solid black',
                  fontSize: '10px',
                  width: '30%',
                }}
                scope='col'
                // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
              >
                REASON
              </th>
            </tr>
          </thead>
          <tbody className='bg-white '>
            {data_print && data_print?.data && Array.isArray(data_print?.data)
              ? data_print?.data?.map((item, index) => (
                  <tr
                    key={index}
                    style={{ background: item?.day === 'Sun' ? '#FFFD38' : '' }}
                  >
                    <td
                      style={{ border: '1px solid black', fontSize: '11px' }}
                      className='px-1 py-1 whitespace-nowrap text-center'
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{ border: '1px solid black', fontSize: '11px' }}
                      className='px-0 py-1  whitespace-nowrap	 text-center'
                    >
                      {item?.employee_id}
                    </td>
                    <td
                      style={{ border: '1px solid black', fontSize: '11px' }}
                      className='px-0 py-1 whitespace-nowrap	text-center '
                    >
                      {item?.name}
                    </td>
                    <td
                      style={{ border: '1px solid black', fontSize: '11px' }}
                      className='px-0 py-1 text-center '
                    >
                      {item?.day}
                    </td>
                    <td
                      style={{ border: '1px solid black', fontSize: '11px' }}
                      className='px-0 py-1 text-center '
                    >
                      {item?.date}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        fontSize: '11px',
                        background:
                          item?.value === 'H'
                            ? '#1AAF54'
                            : item?.time_check_in === ''
                              ? '#FFFD38'
                              : item?.value === 'AL1/2' &&
                                  item?.date_leave?.[0]?.status_request ===
                                    'morning'
                                ? '#FFFD38'
                                : '',

                        color:
                          item?.value === 'AL1/2' &&
                          item?.date_leave?.[0]?.status_request === 'morning'
                            ? '#FF0000'
                            : '',
                      }}
                      className='px-0 py-1  text-center whitespace-nowrap'
                    >
                      {dayjs(item?.time_check_in, 'hh:mm A').isValid()
                        ? dayjs(item?.time_check_in, 'hh:mm A').format(
                            'hh:mm A'
                          )
                        : ''}
                    </td>

                    <td
                      style={{
                        border: '1px solid black',
                        fontSize: '11px',
                        background:
                          item?.value === 'H'
                            ? '#1AAF54'
                            : item?.time_check_out === ''
                              ? '#FFFD38'
                              : item?.value === 'AL1/2' &&
                                  item?.date_leave?.[0]?.status_request ===
                                    'afternoon'
                                ? '#FFFD38'
                                : '',
                        color:
                          item?.value === 'AL1/2' &&
                          item?.date_leave?.[0]?.status_request === 'afternoon'
                            ? '#FF0000'
                            : '',
                      }}
                      className='px-0 py-1  text-center whitespace-nowrap '
                    >
                      {dayjs(item?.time_check_out, 'hh:mm A').isValid()
                        ? dayjs(item?.time_check_out, 'hh:mm A').format(
                            'hh:mm A'
                          )
                        : ''}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        fontSize: '11px',
                        background: item?.value === 'H' ? '#1AAF54' : '',
                      }}
                      className='px-0 py-1  whitespace-nowrap text-center	whitespace-nowrap'
                    >
                      {item?.value === 'S'
                        ? 'OK'
                        : item?.date_leave?.[0]?.status_request ===
                              'afternoon' ||
                            item?.date_leave?.[0]?.status_request === 'morning'
                          ? 'AL1/2'
                          : item?.value === 'L'
                            ? 'Late In'
                            : item?.value}{' '}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        fontSize: '11px',
                        color:
                          item?.value === 'H' ||
                          (item?.day === 'Sun' && item?.value === 'Sh')
                            ? '#FF0000'
                            : '',
                      }}
                      className='px-0 py-1 text-center '
                    >
                      {item?.day === 'Sun' && item?.value === 'Sh'
                        ? 'Sunday'
                        : item?.value === 'S'
                          ? ''
                          : item?.note}
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
        <div className='flex justify-between py-5'>
          <div>
            <p className='text-center'>ផ្នែករដ្ផបាលនិងធនធានមនុស្ស</p>
            <p className='text-center my-5'>
              ឈ្មោះ....................................
            </p>
          </div>
          <table
            // className='flex justify-end my-8'
            style={{ borderCollapse: 'collapse', width: '300px' }}
          >
            <tbody className='' style={{ width: '30%', background: '#F6CAAE' }}>
              {resultTotalCount &&
                resultTotalCount.map((element) => (
                  <tr key={element.name}>
                    {' '}
                    {/* Ensure you have a unique key for each row */}
                    <td
                      style={{ border: 'solid 1px black', width: '150px' }}
                      className='py-1 px-4'
                    >
                      <div className='flex justify-between p-0'>
                        <p className='p-0 m-0'>{element?.name}</p>
                        <p className='p-0 m-0'>:</p>
                      </div>
                    </td>
                    <td
                      style={{ border: 'solid 1px black', width: '80px' }}
                      className='py-1 px-4'
                    >
                      {element?.value}
                    </td>
                    <td
                      style={{ border: 'solid 1px black', width: '80px' }}
                      className='py-1 px-4'
                    >
                      {element?.count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
})

// // Setting the display name for the component to avoid ESLint warning
PrintableTable.displayName = 'PrintableTable'

export default PrintableTable
