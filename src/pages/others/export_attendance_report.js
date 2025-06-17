export const cols = [
  { header: 'No', key: 'no', width: 5, style: { font: { size: 12 } } },
  {
    header: 'Full Name',
    key: 'full_name',
    style: { font: { size: 12 } },
  },
  {
    header: 'ID',
    key: 'vts_code',
    style: { font: { size: 12 } },
  },
  {
    header: 'Join Date',
    key: 'join_date',
    style: { font: { size: 12 } },
  },
]

export const fileName = 'employee'

export const formate_data =
  Array.isArray(data) &&
  export_data.map((item, index) => ({
    ...item,
    no: index + 1,
    full_name: item.full_name,
    vts_code: item.vts_code,
    passed_probation: Formate_Date(item.passed_probation),
    date_of_birth: Formate_Date(item.date_of_birth),
  }))
