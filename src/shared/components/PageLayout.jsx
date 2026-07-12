import AppHeader from '@/shared/components/AppHeader'

const PageLayout = ({
  children,
  headerProps = {},
  footer = null,
  mainClassName = '',
  bgImage = null,
}) => {
  const backgroundStyle = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}

  return (
    <div
      className="app-shell relative"
      style={backgroundStyle}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(0px)' }}
      />
      <div className="z-10 relative flex flex-col h-full w-full overflow-hidden">
        <AppHeader {...headerProps} />
        <main className={`app-main ${mainClassName}`}>{children}</main>
        {footer ? <div className="flex-shrink-0">{footer}</div> : null}
      </div>
    </div>
  )
}

export default PageLayout
