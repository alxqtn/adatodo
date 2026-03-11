"use client"

type Props = {
  checked: boolean
  toggle: () => void
}

export default function Checkbox({ checked, toggle }: Props) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={toggle}
      className="peer w-4 h-4 cursor-pointer"
    />
  )
}
