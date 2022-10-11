import React from 'react'

import * as S from './styles'

export function CardCategory({
  category,
  activeCategory,
  setActiveCategory,
}: any) {
  return (
    <S.ItemsCategory
      key={category.id}
      isActiveCategory={activeCategory === category.id}
      onClick={() => setActiveCategory(category.id)}
    >
      {category.path && (
        <S.CategoryImage
          src={category.url}
          alt={`Imagem da categoria ${category.name}`}
        />
      )}
      <S.CategoryName>{category.name}</S.CategoryName>
    </S.ItemsCategory>
  )
}
