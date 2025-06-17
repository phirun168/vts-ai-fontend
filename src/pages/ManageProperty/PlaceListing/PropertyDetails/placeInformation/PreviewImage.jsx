// PreviewImage.jsx
import React, { useMemo, useState, useRef } from 'react'
import { Modal, Tabs, Button } from 'antd'
import {
  CloseOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/free-mode'
import './PreviewImage.css'

const { TabPane } = Tabs

export default function PreviewImage({
  open,
  setOpen,
  galleries = [],
  getFileByName = (p) => p,
  onPreview = () => {},
  onDelete = () => {},
}) {
  const items = useMemo(
    () =>
      galleries.flatMap((g) =>
        (g.files || []).map((file, i) => ({
          id: `${g._id}-${i}`,
          url: getFileByName(file),
          album: g.category_gallery || 'Other',
        }))
      ),
    [galleries, getFileByName]
  )

  const albums = useMemo(() => {
    // collect whatever categories you have (might include "All")
    const cats = galleries.map((g) => g.category_gallery || 'Other')

    // put "All" in front, then dedupe _everything_ via a Set
    return Array.from(new Set(['All', ...cats]))
  }, [galleries])

  const [activeKey, setActiveKey] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef(null)

  const filtered = useMemo(
    () =>
      activeKey === 'All'
        ? items
        : items.filter((it) => it.album === activeKey),
    [items, activeKey]
  )
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <Modal
      open={open}
      title='Preview Image'
      onCancel={() => setOpen(false)}
      footer={null}
      width='80%'
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
      closeIcon={<CloseOutlined style={{ fontSize: 18 }} />}
    >
      <div style={{ padding: '0px 0px', background: '#fff' }}>
        <Tabs
          activeKey={activeKey}
          onChange={(k) => {
            setActiveKey(k)
            setCurrentIndex(0)
          }}
          className='tab-image-property-preview'
          style={{ borderBottom: 'none' }}
          animated={false}
          size='large'
          tabBarGutter={16}
        >
          {albums.map(
            (alb) => (
              //   alb.trim().toLowerCase() !== 'all' && (
              <TabPane tab={alb} key={alb} />
            )
            //   )
          )}
        </Tabs>
      </div>

      <div className='preview-slide-wrapper'>
        {filtered.length === 0 ? (
          <div className='no-images-placeholder'>No images available.</div>
        ) : (
          <>
            <Swiper
              onInit={(swiper) => {
                // Tell Swiper about our refs _after_ they've mounted
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.navigation.init()
                swiper.navigation.update()
              }}
              modules={[Navigation, Mousewheel, FreeMode]}
              navigation={{
                prevEl: '.custom-swiper-button-prev',
                nextEl: '.custom-swiper-button-next',
              }}
              mousewheel={{ forceToAxis: true }}
              freeMode={true}
              grabCursor={true}
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setCurrentIndex(sw.realIndex)}
              slidesPerView='auto'
              centeredSlides={true}
              spaceBetween={24}
              loop={filtered.length > 1}
              className='h-[70vh]'
            >
              {filtered.map((it) => (
                <SwiperSlide key={it.id} className='slide-pane'>
                  <img src={it.url} alt='' className='slide-img' />
                </SwiperSlide>
              ))}

              <div
                ref={prevRef}
                className='custom-swiper-button-prev nav-arrow'
                style={{ left: 0 }}
              >
                <LeftOutlined className='text-white' />
              </div>
              <div
                ref={nextRef}
                className='custom-swiper-button-next nav-arrow'
                style={{ right: 0 }}
              >
                <RightOutlined className='text-white' />
              </div>
            </Swiper>

            <div className='gradient-overlay left' />
            <div className='gradient-overlay right' />
            <div className='preview-count'>
              {`${currentIndex + 1}/${filtered.length}`}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
