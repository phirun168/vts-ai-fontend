// import { Col, Row } from 'antd'
// import React, { forwardRef } from 'react'
// // import styles from"./
// const data = {
//   first_name: 'somnak',
//   last_name: 'kalan',
//   employee_id: 'VTS-0444',
//   days: [
//     {
//       date: '2024-05-01',
//       day: 'Wed',
//       value: 'H',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: '',
//       createdAt: null,
//       date_holiday: [
//         {
//           date: '2024-05-01',
//           status: 'approve',
//         },
//       ],
//     },
//     {
//       date: '2024-05-02',
//       day: 'Thu',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-03',
//       day: 'Fri',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-04',
//       day: 'Sat',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-05',
//       day: 'Sun',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-06',
//       day: 'Mon',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-07',
//       day: 'Tue',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-08',
//       day: 'Wed',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-09',
//       day: 'Thu',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-10',
//       day: 'Fri',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-11',
//       day: 'Sat',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-12',
//       day: 'Sun',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-13',
//       day: 'Mon',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-14',
//       day: 'Tue',
//       value: 'H',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: '',
//       createdAt: null,
//       date_holiday: [
//         {
//           date: '2024-05-14',
//           status: 'approve',
//         },
//       ],
//     },
//     {
//       date: '2024-05-15',
//       day: 'Wed',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-16',
//       day: 'Thu',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-17',
//       day: 'Fri',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-18',
//       day: 'Sat',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-19',
//       day: 'Sun',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-20',
//       day: 'Mon',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-21',
//       day: 'Tue',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-22',
//       day: 'Wed',
//       value: 'H',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: '',
//       createdAt: null,
//       date_holiday: [
//         {
//           date: '2024-05-22',
//           status: 'approve',
//         },
//       ],
//     },
//     {
//       date: '2024-05-23',
//       day: 'Thu',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-24',
//       day: 'Fri',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-25',
//       day: 'Sat',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-26',
//       day: 'Sun',
//       value: 'H',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: '',
//       createdAt: null,
//       date_holiday: [
//         {
//           date: '2024-05-26',
//           status: 'approve',
//         },
//       ],
//     },
//     {
//       date: '2024-05-27',
//       day: 'Mon',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-28',
//       day: 'Tue',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-29',
//       day: 'Wed',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-30',
//       day: 'Thu',
//       value: 'A',
//       status: 'false',
//       time_check_in: '5:00 AM',
//       time_check_out: '8:00 PM',
//       note: 'Absent',
//     },
//     {
//       date: '2024-05-31',
//       day: 'Fri',
//       value: 'A',
//       status: 'false',
//       time_check_in: '',
//       time_check_out: '',
//       note: 'Absent',
//     },
//   ],
// }

// const PrintableTable = forwardRef((props, ref) => (
//   <div
//     ref={ref}
//     style={{
//       visibility: 'visible',
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       width: '21cm',
//       height: ' 29.7cm',
//       margin: 0.5,
//       padding: ' 1cm',
//       fontFamily: 'Times New Roman',
//     }}
//   >
//     <div
//       style={{
//         background: '#AACC92',
//         borderTopLeftRadius: '5px',
//         borderTopRightRadius: '5px',
//         fontSize: '10px',
//       }}
//       className='text-center py-2 font-bold'
//     >
//       FINGER PRINT JUNE 2024
//     </div>

//     <table
//       className='min-w-full  '
//       style={{ border: '1px solid black', borderCollapse: 'collapse' }}
//     >
//       <thead style={{ background: '#AACC92' }}>
//         <tr>
//           <th
//             style={{ border: '1px solid black', fontSize: '10px', width: '4%' }}
//             scope='col'
//             className=' py-2	 tracking-wider font-bold  uppercase'
//           >
//             Nº
//           </th>
//           <th
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '9%',
//             }}
//             scope='col'
//             className='	py-2 tracking-wider font-bold  uppercase'
//           >
//             ID
//           </th>
//           <th
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '20%',
//             }}
//             scope='col'
//             className='	py-2 tracking-wider font-bold  uppercase'

//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             NAME
//           </th>
//           <th
//             style={{ border: '1px solid black', fontSize: '10px', width: '5%' }}
//             scope='col'
//             className='py-2	 tracking-wider font-bold  uppercase'

//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             DAY
//           </th>
//           <th
//             className='py-2	 tracking-wider font-bold  uppercase'
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '10%',
//             }}
//             scope='col'

//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             DATE
//           </th>
//           <th
//             className='py-2	 tracking-wider font-bold  uppercase'
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '9%',
//             }}
//             scope='col'
//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             CLOCK IN
//           </th>
//           <th
//             className='py-2	 tracking-wider font-bold  uppercase'
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '9%',
//             }}
//             scope='col'

//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             CLOCK OUT
//           </th>
//           <th
//             className='	py-2 tracking-wider font-bold  uppercase'
//             style={{ border: '1px solid black', fontSize: '10px', width: '9%' }}
//             scope='col'
//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             NOTE
//           </th>
//           <th
//             className='	py-2 tracking-wider font-bold  uppercase'
//             style={{
//               border: '1px solid black',
//               fontSize: '10px',
//               width: '30%',
//             }}
//             scope='col'
//             // className=' py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'
//           >
//             REASON
//           </th>
//         </tr>
//       </thead>
//       <tbody className='bg-white '>
//         {data?.days?.map((item, index) => (
//           <tr
//             key={item.key}
//             style={{ background: item?.day === 'Sun' ? '#FFFD38' : '' }}
//           >
//             <td
//               style={{ border: '1px solid black', fontSize: '11px' }}
//               className='px-1 py-2 whitespace-nowrap text-center'
//             >
//               {index + 1}
//             </td>
//             <td
//               style={{ border: '1px solid black', fontSize: '11px' }}
//               className='px-0 py-2  whitespace-nowrap	 text-center'
//             >
//               {data?.employee_id}
//             </td>
//             <td
//               style={{ border: '1px solid black', fontSize: '11px' }}
//               className='px-0 py-2 whitespace-nowrap	text-center '
//             >
//               {data?.first_name + ' ' + data?.last_name}
//             </td>
//             <td
//               style={{ border: '1px solid black', fontSize: '11px' }}
//               className='px-0 py-2 text-center '
//             >
//               {item?.day}
//             </td>
//             <td
//               style={{ border: '1px solid black', fontSize: '11px' }}
//               className='px-0 py-2 text-center '
//             >
//               {item?.date}
//             </td>
//             <td
//               style={{
//                 border: '1px solid black',
//                 fontSize: '11px',
//                 background:
//                   item?.value === 'H' && item?.day !== 'Sun'
//                     ? '#1AAF54'
//                     : '#FFFD38',
//                 color:
//                   item?.value === 'H' && item?.day !== 'Sun'
//                     ? '#000000'
//                     : '#FF0000',
//                 // FFFFFF
//               }}
//               className='px-0 py-2  text-center'
//             >
//               {item?.time_check_in}
//             </td>
//             <td
//               style={{
//                 border: '1px solid black',
//                 fontSize: '11px',
//                 background:
//                   item?.value === 'H' && item?.day !== 'Sun'
//                     ? '#1AAF54'
//                     : item?.time_check_out === '' ||
//                       item?.time_check_out === null ||
//                       item?.time_check_out === undefined
//                     ? '#FFFD38'
//                     : '',
//               }}
//               className='px-0 py-2  text-center '
//             >
//               {item?.time_check_out}
//             </td>
//             <td
//               style={{
//                 border: '1px solid black',
//                 fontSize: '11px',
//                 background:
//                   item?.value === 'H' && item?.day !== 'Sun' ? '#1AAF54' : '',
//               }}
//               className='px-0 py-2  whitespace-nowrap text-center	'
//             >
//               {item?.note}
//             </td>
//             <td
//               style={{
//                 border: '1px solid black',
//                 fontSize: '11px',
//                 color:
//                   item?.value === 'H' || item?.value === 'Sun' ? '#FF0000' : '',
//               }}
//               className='px-0 py-2 text-center '
//             >
//               {item?.reason}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <table
//       className='flex justify-end my-8'
//       style={{ borderCollapse: 'collapse' }}
//     >
//       <tbody
//         className=''
//         style={{ width: '40%', background: '#F6CAAE' }}
//       >
//         <tr>
//           <td
//             style={{ border: 'solid 1px black', width: '50%' }}
//             className='py-1 px-4'
//           >
//             <div className='flex justify-between p-0 p-0'>
//               <p className='p-0 m-0'>Absent</p>
//               <p className='p-0 m-0'>:</p>
//             </div>
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '15%' }}
//             className='py-1 px-4'
//           >
//             2
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '20%' }}
//             className='py-1 px-4'
//           >
//             days
//           </td>
//         </tr>
//         <tr>
//           <td
//             style={{ border: 'solid 1px black', width: '50%' }}
//             className='py-1 px-4'
//           >
//             <div className='flex justify-between p-0 m-0'>
//               <p className='p-0 m-0'>Missed Scan</p>
//               <p className='p-0 m-0'>:</p>
//             </div>
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '15%' }}
//             className='py-1 px-4'
//           >
//             2
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '20%' }}
//             className='py-1 px-4'
//           >
//             times
//           </td>
//         </tr>
//         <tr>
//           <td
//             style={{ border: 'solid 1px black', width: '50%' }}
//             className='py-1 px-4'
//           >
//             <div className='flex justify-between p-0 m-0'>
//               <p className='p-0 m-0'>Late</p>
//               <p className='p-0 m-0'>:</p>
//             </div>
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '15%' }}
//             className='py-1 px-4'
//           >
//             2
//           </td>
//           <td
//             style={{ border: 'solid 1px black', width: '20%' }}
//             className='py-1 px-4'
//           >
//             times
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// ))

// // Setting the display name for the component to avoid ESLint warning
// PrintableTable.displayName = 'PrintableTable'

// export default PrintableTable

// ///

// ///
// import React, { useRef } from 'react'
// import { Button } from 'antd'
// import { useReactToPrint } from 'react-to-print'
// import PrintableTable from './PrintableTable'

// const PrintComponent = () => {
//   const componentRef = useRef()

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   })

//   return (
//     <div style={{ marginTop: '50px' }}>
//       <Button
//         type='primary'
//         onClick={handlePrint}
//       >
//         Print
//       </Button>
//       <div style={{ display: 'none' }}>
//         <PrintableTable ref={componentRef} />
//       </div>
//     </div>
//   )
// }

// export default PrintComponent
