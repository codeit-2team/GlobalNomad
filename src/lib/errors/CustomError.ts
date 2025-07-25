/**
 * HTTP 에러 응답을 처리하기 위한 커스텀 에러 클래스입니다.
 *
 * 기본 Error 객체에 HTTP 상태 코드를 추가하여,
 * 서버에서 발생한 에러를 클라이언트에 명확하게 전달할 수 있도록 합니다.
 *
 * @example
 * throw new CustomError('잘못된 요청입니다.', 400);
 */
export default class CustomError extends Error {
  httpStatus: number; // HTTP 상태 코드 (예: 400, 401, 404, 500 등)

  /**
   * CustomError 인스턴스를 생성합니다.
   *
   * @param message - 에러에 대한 설명 메시지
   * @param httpStatus - HTTP 상태 코드 (기본값: 400)
   */
  constructor(message: string, httpStatus = 400) {
    super(message);
    this.name = 'CustomError';
    this.httpStatus = httpStatus;
  }
}
