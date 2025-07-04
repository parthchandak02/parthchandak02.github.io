import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  children,
  variant = 'default',
  size = 'medium',
  icon: IconComponent,
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'skill':
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#cccccc',
          border: 'none', // Remove white border but keep glass effect
        };
      case 'category':
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          color: '#888',
          border: 'none', // Remove white border but keep glass effect
        };
      case 'time':
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: 'none', // Remove white border but keep glass effect
        };
      case 'accent':
        return {
          background: 'rgba(255, 107, 107, 0.08)',
          color: '#ff9999',
          border: 'none', // Remove white border but keep glass effect
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#cccccc',
          border: 'none', // Remove white border but keep glass effect
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          borderRadius: '6px',
        };
      case 'large':
        return {
          padding: '0.5rem 1rem',
          fontSize: '0.85rem',
          borderRadius: '20px',
        };
      default:
        // medium
        return {
          padding: '0.5rem',
          fontSize: '0.8rem',
          borderRadius: '20px',
        };
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: '"JetBrains Mono", "SF Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
    fontWeight: variant === 'category' || variant === 'time' ? '600' : '500',
    textTransform: variant === 'category' || variant === 'time' ? 'uppercase' : 'none',
    letterSpacing: variant === 'category' || variant === 'time' ? '0.05em' : '0.01em',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
    whiteSpace: 'nowrap',
    // Glass morphism effect - keep the original liquid glass look
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow:
      variant === 'category' || variant === 'time'
        ? 'none'
        : '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style, // Allow style overrides
  };

  return (
    <span
      className={`glass ${className}`} // Keep the glass class for consistency
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={e => {
        // HIGHEST PRIORITY: Hover state always shows dark red and expands
        e.currentTarget.style.background = 'rgba(255, 107, 107, 0.15)';
        e.currentTarget.style.color = '#ff6b6b';
        e.currentTarget.style.transform = 'translateY(-1px)';

        // For skill tags, trigger text expansion on hover
        if (props.onHoverExpand) {
          props.onHoverExpand(true);
        }
      }}
      onMouseLeave={e => {
        // Return to the original variant state
        const variantStyles = getVariantStyles();
        e.currentTarget.style.background = variantStyles.background;
        e.currentTarget.style.color = variantStyles.color;
        e.currentTarget.style.transform = 'translateY(0)';

        // For skill tags, trigger text collapse on mouse leave
        if (props.onHoverExpand) {
          props.onHoverExpand(false);
        }
      }}
      onKeyDown={
        onClick
          ? e => {
            // Add keyboard support for accessibility
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(e);
            }
          }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}>
      {IconComponent && (
        <IconComponent
          size={size === 'small' ? 16 : size === 'large' ? 18 : 16}
          style={{ flexShrink: 0 }}
        />
      )}
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'skill', 'category', 'time', 'accent']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.elementType,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  onHoverExpand: PropTypes.func,
};

export default Tag;
