import React from "react";

export interface ButtonUIProps {
  icon?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  isHovered?: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ButtonUI: React.FC<ButtonUIProps> = ({
  icon,
  text,
  disabled,
  loading,
  size = 'medium',
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  // 修改尺寸样式的组织方式，将内边距和文字大小分开
  const sizeStyles = {
    small: {
      padding: 'px-2 py-1',
      text: 'text-sm !important',
      loading: 'h-3 w-3'
    },
    medium: {
      padding: 'px-4 py-2',
      text: 'text-base !important',
      loading: 'h-4 w-4'
    },
    large: {
      padding: 'px-6 py-3',
      text: 'text-lg !important',
      loading: 'h-5 w-5'
    }
  };

  // 根据尺寸设置图标大小
  const iconSizes = {
    small: { width: 14, height: 14 },
    medium: { width: 16, height: 16 },
    large: { width: 20, height: 20 }
  };

  // 克隆并修改 Heroicons 图标
  const modifiedIcon = React.isValidElement(icon) 
    ? React.cloneElement(icon as React.ReactElement<{
        className?: string;
        'aria-hidden'?: boolean;
        style?: React.CSSProperties;
        width?: number;
        height?: number;
      }>, {
        'aria-hidden': true,
        style: { 
          width: `${iconSizes[size].width}px`, 
          height: `${iconSizes[size].height}px`,
          minWidth: `${iconSizes[size].width}px`, 
          minHeight: `${iconSizes[size].height}px` 
        },
        width: iconSizes[size].width,
        height: iconSizes[size].height,
        className: undefined
      })
    : icon;

  const loadingDotStyle = {
    animation: 'dotAnimation 1.4s infinite',
    opacity: 0.2,
    margin: '0 2px'
  };

  const loadingKeyframes = `
    @keyframes dotAnimation {
      0%, 80%, 100% { opacity: 0.2; }
      40% { opacity: 1; }
    }
  `;

  return (
    <>
      <style>{loadingKeyframes}</style>
      <button
        className={`
          inline-flex items-center justify-center gap-2 rounded-md
          ${sizeStyles[size].padding}
          ${disabled 
            ? 'bg-gray-200 cursor-not-allowed' 
            : loading
              ? 'bg-blue-400 cursor-wait'
              : 'bg-blue-500 hover:bg-blue-600'
          }
          ${isHovered && !disabled && !loading ? 'bg-blue-600' : ''}
          text-white transition-colors duration-200
        `}
        disabled={disabled || loading}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="inline-flex items-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <span style={{ ...loadingDotStyle, animationDelay: '0s' }}>.</span>
              <span style={{ ...loadingDotStyle, animationDelay: '0.2s' }}>.</span>
              <span style={{ ...loadingDotStyle, animationDelay: '0.4s' }}>.</span>
            </div>
          ) : icon ? (
            <div className="flex-shrink-0">
              {modifiedIcon}
            </div>
          ) : null}
        </div>
        <span 
          className="inline-block align-middle"
          style={{ 
            fontSize: size === 'small' ? '0.875rem' : size === 'medium' ? '1rem' : '1.125rem',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'loading' : text}
        </span>
      </button>
    </>
  );
}; 