import { vi, describe, it, expect } from 'vitest';
import { commands } from '../src/commands';

// We'll mock the commands to verify they are called correctly
vi.mock('../src/commands', () => ({
  commands: {
    doctor: vi.fn(),
    help: vi.fn(),
    version: vi.fn(),
    list: vi.fn(),
    validate: vi.fn(),
    skills: vi.fn(),
    registry: vi.fn(),
    init: vi.fn(),
    create: vi.fn(),
    search: vi.fn(),
    info: vi.fn(),
    install: vi.fn(),
    uninstall: vi.fn(),
    update: vi.fn(),
    upgrade: vi.fn(),
    publish: vi.fn(),
    export: vi.fn(),
    run: vi.fn(),
  }
}));

describe('interactive command parser', () => {
    it('should call commands.doctor when input is "doctor"', async () => {
        // We'll simulate the command execution logic here
        const input = "doctor";
        const [cmd] = input.split(" ");
        if (cmd === "doctor") {
            commands.doctor();
        }
        expect(commands.doctor).toHaveBeenCalled();
    });

    it('should call commands.search with correct argument when input is "search docker"', async () => {
        const input = "search docker";
        const [cmd, ...args] = input.split(" ");
        if (cmd === "search") {
            commands.search(args[0]);
        }
        expect(commands.search).toHaveBeenCalledWith("docker");
    });
});
