import { ref, computed } from "vue"

export default function useShortcut(props, listRef) {
    const ANCHOR_HEIGHT = 18
    const anchorY = ref(0)
    const anchorIndex = ref(0)
    const scrollRef = ref(null)

    const shortcutList = computed(() => {
        return props.data.map(p => p.title)
    })
    function onShortcutTouchStart(e) {
        anchorIndex.value = parseInt(e.target.dataset.index)
        anchorY.value = e.touches[0].pageY
        scrollTo()
    }
    function onShortcutTouchMove(e: TouchEvent) {
        const y = e.touches[0].pageY
        const diff = Math.floor((y - anchorY.value) / ANCHOR_HEIGHT)
        const index = diff + anchorIndex.value
        scrollTo(index)
    }
    function scrollTo(index = undefined) {
        index = index !== undefined ? index : anchorIndex.value
        index = Math.min(shortcutList.value.length - 1, index)
        index = Math.max(0, index)
        const targetEl = listRef.value.children[index]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl, 0)
    }
    return {
        shortcutList,
        onShortcutTouchStart,
        onShortcutTouchMove,
        scrollRef
    }
}