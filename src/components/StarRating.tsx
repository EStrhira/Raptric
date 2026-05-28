import React from 'react';
import styled from 'styled-components';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  color?: string;
  darkTheme?: boolean;
  className?: string;
}

const StarContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.size === 'small' ? '2px' : props.size === 'medium' ? '4px' : '6px'};
`;

const Star = styled.div<{ filled: boolean; size: 'small' | 'medium' | 'large'; color: string }>`
  width: ${props => props.size === 'small' ? '12px' : props.size === 'medium' ? '16px' : '20px'};
  height: ${props => props.size === 'small' ? '12px' : props.size === 'medium' ? '16px' : '20px'};
  color: ${props => props.filled ? props.color : '#e0e0e0'};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.color};
  }
`;

const RatingValue = styled.span<{ size: 'small' | 'medium' | 'large' }>`
  font-size: ${props => props.size === 'small' ? '0.8rem' : props.size === 'medium' ? '0.9rem' : '1rem'};
  font-weight: 600;
  color: #333;
  margin-left: 8px;
`;

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  showValue = false,
  color = '#ffc107',
  darkTheme = false,
  className = ''
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          filled={true}
          size={size}
          color={color}
        >
          ★
        </Star>
      );
    }

    // Half star (if any)
    if (hasHalfStar && fullStars < maxRating) {
      stars.push(
        <Star
          key="half-star"
          filled={true}
          size={size}
          color={color}
          style={{ position: 'relative' }}
        >
          <span style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}>★</span>
          <span style={{ opacity: 0.3 }}>★</span>
        </Star>
      );
    }

    // Empty stars
    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-star-${i}`}
          filled={false}
          size={size}
          color={color}
        >
          ★
        </Star>
      );
    }

    return stars;
  };

  return (
    <StarContainer size={size} className={className}>
      {renderStars()}
      {showValue && (
        <RatingValue size={size}>
          {rating.toFixed(1)}
        </RatingValue>
      )}
    </StarContainer>
  );
};

export default StarRating;
