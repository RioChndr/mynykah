import { AppInitLogger } from './app-init.logger';
import { Logger } from '@nestjs/common';
import { RouteParent } from 'src/route-parent';

describe('Test app-init.logger.ts', () => {
  const loggerLog = jest.spyOn(Logger.prototype, 'log');
  const port = process.env.PORT || 3000;
  AppInitLogger();

  it('App init print logger', () => {
    expect(loggerLog).toHaveBeenCalled();
  });
  it('Logger show admin location url', () => {
    expect(loggerLog).toHaveBeenCalledWith(
      expect.stringContaining(`localhost:${port}${RouteParent.admin}`),
    );
  });
  it('Logger show api location url', () => {
    expect(loggerLog).toHaveBeenCalledWith(
      expect.stringContaining(`localhost:${port}${RouteParent.server.api}`),
    );
  });
  it('Logger show swagger location url', () => {
    expect(loggerLog).toHaveBeenCalledWith(
      expect.stringContaining(`localhost:${port}${RouteParent.server.swagger}`),
    );
  });
  it('Logger show pid', () => {
    expect(loggerLog).toHaveBeenCalledWith(
      expect.stringContaining(`${process.pid}`),
    );
  });
});
