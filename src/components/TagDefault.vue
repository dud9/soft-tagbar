<script setup lang="ts">
import { computed, unref } from 'vue'
import TagButtonClose from './TagButtonClose.vue'
import { addColorAlpha, useBoolean } from '~/composables'
import { EnumSoftTagBar as Enum } from '~/enum'

interface Props {
  isDark?: boolean
  isActive?: boolean
  closable?: boolean
  primaryColor?: string
  borderColor?: string
  borderDarkColor?: string
  inverted?: boolean
}

const {
  isDark = false,
  isActive = false,
  closable = true,
  primaryColor = Enum.primaryColor,
  borderColor = Enum.borderColor,
  borderDarkColor = Enum.borderDarkColor,
  inverted = false,
} = defineProps<Props>()
const emit = defineEmits(['close'])

const { bool: isHover, setTrue, setFalse } = useBoolean()
const isTagActive = computed(() => isActive || unref(isHover))
const tagStyle = computed(() => {
  if (!inverted) {
    const style: Record<string, string> = {
      borderColor: unref(isTagActive)
        ? addColorAlpha(primaryColor, 0.3)
        : isDark
          ? borderDarkColor
          : borderColor,
    }

    if (unref(isTagActive))
      style.color = primaryColor

    if (isActive)
      style.backgroundColor = addColorAlpha(primaryColor, isDark ? 0.15 : 0.1)

    return style
  }
  else {
    return {
      color: 'white',
      backgroundColor: isActive
        ? primaryColor
        : unref(isHover)
          ? addColorAlpha(primaryColor, 0.75)
          : addColorAlpha(primaryColor, 0.5),
    }
  }
})
function handleClose(e: MouseEvent) {
  e.stopPropagation()
  emit('close')
}
</script>

<template>
  <div
    relative flex-inline justify-center items-center
    h-30px px-14px rounded-2px cursor-pointer
    :style="tagStyle"
    :class="{ 'border-1 border-solid': !inverted }"
    @mouseenter="setTrue"
    @mouseleave="setFalse"
  >
    <span>
      <slot />
    </span>
    <TagButtonClose
      v-if="closable" pl-10px
      :is-active="isTagActive"
      :inverted="inverted"
      :active-color="primaryColor"
      @click="handleClose"
    />
  </div>
</template>
