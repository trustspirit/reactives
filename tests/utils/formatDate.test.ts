import { formatDate } from '../../src/utils/formatDate'

describe('formatDate', () => {
  it('should format date with default options', () => {
    const result = formatDate(new Date('2024-01-15'))
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should accept string input', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'long', day: 'numeric' }, 'en-US')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('should accept locale', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'long' }, 'ko-KR')
    expect(result).toContain('2024')
  })

  it('should accept timestamp', () => {
    const ts = new Date('2024-06-15').getTime()
    const result = formatDate(ts)
    expect(typeof result).toBe('string')
  })
})
