import { sleep } from '../../src/utils/sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should resolve after specified delay', async () => {
    const fn = vi.fn()
    sleep(1000).then(fn)

    expect(fn).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1000)
    expect(fn).toHaveBeenCalled()
  })

  it('should resolve with undefined', async () => {
    const promise = sleep(100)
    await vi.advanceTimersByTimeAsync(100)
    const result = await promise
    expect(result).toBeUndefined()
  })
})
