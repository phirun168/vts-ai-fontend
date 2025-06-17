import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Card, Select, Row, Col } from 'antd'
import { StarOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons'

const { Option } = Select

export default function View() {
  // Define available years and months.
  const availableYears = [2022, 2023, 2024]
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const availableWeeks = ['Week1', 'Week2', 'Week3', 'Week4']

  // Dummy yearly data arrays.
  const yearlyPlacesRate = [40, 45, 50]
  const yearlyPlacesReviewers = [2500, 3000, 3500]
  const yearlyGoogleRate = [4.2, 4.5, 4.7]

  // Dummy monthly data arrays.
  const monthlyPlacesRate = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
  const monthlyPlacesReviewers = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
  ]
  const monthlyGoogleRate = [
    4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1,
  ]

  // State for "View by Month" chart (yearly view).
  const [selectedYear, setSelectedYear] = useState(2023)
  // Determine index of selectedYear.
  const yearIndex = availableYears.indexOf(selectedYear)

  // State for "View by Week" chart (monthly view).
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  // Yearly Trends Chart option – xAxis shows all years.
  const yearlyTrendsOption = {
    title: {
      text: `Yearly Trends`,
      left: 'center',
    },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Places Rate', 'Places Reviewers', 'Google Rate'],
      top: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: availableYears.map(String),
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Places Rate',
        data: yearlyPlacesRate,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Places Reviewers',
        data: yearlyPlacesReviewers,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Google Rate',
        data: yearlyGoogleRate,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
    ],
  }

  // Monthly Trends Chart option – xAxis shows all months.
  const monthlyTrendsOption = {
    title: {
      text: `Monthly Trends for ${selectedYear}`,
      left: 'center',
    },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Places Rate', 'Places Reviewers', 'Google Rate'],
      top: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: monthNames,
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Places Rate',
        data: monthlyPlacesRate,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Places Reviewers',
        data: monthlyPlacesReviewers,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Google Rate',
        data: monthlyGoogleRate,
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
    ],
  }

  // Weekly Trends Chart option – xAxis shows 4 weeks.
  const weeklyTrendsOption = {
    title: {
      text: `Weekly Trends for ${monthNames[selectedMonth]} ${selectedYear}`,
      left: 'center',
    },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Places Rate', 'Places Reviewers', 'Google Rate'],
      top: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: availableWeeks,
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Places Rate',
        data: [15, 25, 35, 45],
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Places Reviewers',
        data: [150, 250, 350, 450],
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
      {
        name: 'Google Rate',
        data: [4.2, 4.3, 4.4, 4.5],
        type: 'line',
        smooth: true,
        label: { show: true, position: 'top' },
      },
    ],
  }

  // Updated styles for summary cards with a dashed border.
  const summaryCardStyle = {
    display: 'block',
    alignItems: 'center',
    border: '1px dashed #ccc', // dashed border style (like "-------")
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    margin: 'auto',
  }

  const iconStyle = { fontSize: '28px' }
  const titleStyle = { margin: 0, color: '#333', fontSize: '16px' }
  const numberStyle = {
    margin: 0,
    color: '#007aff',
    fontSize: '22px',
    fontWeight: 'bold',
  }

  return (
    <div>
      {/* Yearly Summary Cards */}
      <Card className='mb-4' bordered={false}>
        <Row gutter={[16, 16]} justify='center'>
          <Col style={{ flex: 1 }}>
            <Card
              bodyStyle={{ padding: '8px' }}
              style={summaryCardStyle}
              bordered={false}
            >
              <StarOutlined style={{ ...iconStyle, color: '#f39c12' }} />
              <div>
                <h4 style={titleStyle}>Places Rate</h4>
                <p style={numberStyle}>{yearlyPlacesRate[yearIndex]}</p>
              </div>
            </Card>
          </Col>
          <Col style={{ flex: 1 }}>
            <Card
              style={summaryCardStyle}
              bodyStyle={{ padding: '8px' }}
              bordered={false}
            >
              <UserOutlined style={{ ...iconStyle, color: '#3498db' }} />
              <div>
                <h4 style={titleStyle}>Places Reviewers</h4>
                <p style={numberStyle}>{yearlyPlacesReviewers[yearIndex]}</p>
              </div>
            </Card>
          </Col>
          <Col style={{ flex: 1 }}>
            <Card
              style={summaryCardStyle}
              bordered={false}
              bodyStyle={{ padding: '8px' }}
            >
              <GlobalOutlined style={{ ...iconStyle, color: '#2ecc71' }} />
              <div>
                <h4 style={titleStyle}>Google Rate</h4>
                <p style={numberStyle}>{yearlyGoogleRate[yearIndex]}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Filtering Control for "View by Month" (Year Selector) */}
      <Card className='mb-4' bordered={false}>
        <div style={{ textAlign: 'center' }}>
          <Select
            defaultValue={selectedYear}
            style={{ width: 120 }}
            onChange={setSelectedYear}
          >
            {availableYears.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </Card>

      {/* "View by Month" Chart */}
      <Card className='shadow-lg mb-8'>
        <ReactECharts option={monthlyTrendsOption} style={{ height: 400 }} />
      </Card>

      {/* Monthly Summary Cards */}
      <Card className='mb-4' bordered={false}>
        <Row gutter={[16, 16]} justify='center'>
          <Col>
            <Card style={summaryCardStyle} bordered={false}>
              <StarOutlined style={{ ...iconStyle, color: '#f39c12' }} />
              <div>
                <h4 style={titleStyle}>Places Rate</h4>
                <p style={numberStyle}>{monthlyPlacesRate[selectedMonth]}</p>
              </div>
            </Card>
          </Col>
          <Col>
            <Card style={summaryCardStyle} bordered={false}>
              <UserOutlined style={{ ...iconStyle, color: '#3498db' }} />
              <div>
                <h4 style={titleStyle}>Places Reviewers</h4>
                <p style={numberStyle}>
                  {monthlyPlacesReviewers[selectedMonth]}
                </p>
              </div>
            </Card>
          </Col>
          <Col>
            <Card style={summaryCardStyle} bordered={false}>
              <GlobalOutlined style={{ ...iconStyle, color: '#2ecc71' }} />
              <div>
                <h4 style={titleStyle}>Google Rate</h4>
                <p style={numberStyle}>{monthlyGoogleRate[selectedMonth]}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Filtering Control for "View by Week" (Month Selector) */}
      <Card className='mb-4' bordered={false}>
        <div style={{ textAlign: 'center' }}>
          <Select
            defaultValue={monthNames[selectedMonth]}
            style={{ width: 120 }}
            onChange={(value) => {
              const index = monthNames.indexOf(value)
              if (index !== -1) setSelectedMonth(index)
            }}
          >
            {monthNames.map((month) => (
              <Option key={month} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </div>
      </Card>

      {/* "View by Week" Chart */}
      <Card className='shadow-lg'>
        <ReactECharts option={weeklyTrendsOption} style={{ height: 400 }} />
      </Card>
    </div>
  )
}
